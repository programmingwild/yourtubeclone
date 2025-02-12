// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { Room, Message, Invitation } = require('./models');
const EncryptionService = require('./utils/encryption');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Room management endpoints
app.post('/api/rooms', async (req, res) => {
  try {
    const { name, createdBy, username } = req.body;
    const roomId = crypto.randomBytes(8).toString('hex');
    const inviteCode = EncryptionService.generateInviteCode();
    
    const room = new Room({
      roomId,
      name,
      createdBy,
      participants: [{ userId: createdBy, username, role: 'admin' }],
      inviteCode
    });
    
    await room.save();
    res.json({ room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { roomId } = req.body;
    const file = req.file;
    
    res.json({
      fileUrl: `/uploads/${file.filename}`,
      fileName: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  let currentRoom = null;
  let currentUser = null;

  // Join room
  socket.on('join_room', async ({ roomId, userId, username }) => {
    try {
      const room = await Room.findOne({ roomId });
      if (!room) {
        socket.emit('error', 'Room not found');
        return;
      }

      currentRoom = roomId;
      currentUser = { userId, username };
      
      socket.join(roomId);

      // Load previous messages
      const messages = await Message.find({ roomId })
        .sort({ timestamp: -1 })
        .limit(50);
      
      socket.emit('previous_messages', messages);

      // Notify others
      io.to(roomId).emit('user_joined', {
        userId,
        username,
        timestamp: new Date()
      });
    } catch (error) {
      socket.emit('error', 'Failed to join room');
    }
  });

  // Handle new messages
  socket.on('send_message', async (data) => {
    try {
      const { roomId, content, type = 'text' } = data;
      
      // Encrypt the message content
      const roomKey = await getRoomKey(roomId); // Implement key management
      const { encrypted, iv, authTag } = await EncryptionService.encryptMessage(
        JSON.stringify(content),
        roomKey
      );

      const message = new Message({
        roomId,
        sender: currentUser,
        content: {
          type,
          ...content
        },
        encryptedContent: encrypted,
        iv,
        authTag
      });

      await message.save();

      // Broadcast to room
      io.to(roomId).emit('receive_message', {
        ...message.toJSON(),
        timestamp: new Date()
      });
    } catch (error) {
      socket.emit('error', 'Failed to send message');
    }
  });

  // Handle file sharing
  socket.on('share_file', async (data) => {
    try {
      const { roomId, fileData } = data;
      
      const message = new Message({
        roomId,
        sender: currentUser,
        content: {
          type: 'file',
          ...fileData
        }
      });

      await message.save();

      io.to(roomId).emit('receive_file', {
        ...message.toJSON(),
        timestamp: new Date()
      });
    } catch (error) {
      socket.emit('error', 'Failed to share file');
    }
  });

  // Handle invitations
  socket.on('create_invite', async ({ roomId, maxUses, expiresIn }) => {
    try {
      const inviteCode = EncryptionService.generateInviteCode();
      
      const invitation = new Invitation({
        roomId,
        inviteCode,
        createdBy: currentUser.userId,
        expiresAt: new Date(Date.now() + expiresIn),
        maxUses
      });

      await invitation.save();
      
      socket.emit('invite_created', { inviteCode });
    } catch (error) {
      socket.emit('error', 'Failed to create invitation');
    }
  });

  // Handle disconnection
  socket.on('disconnect', async () => {
    if (currentRoom && currentUser) {
      io.to(currentRoom).emit('user_left', {
        userId: currentUser.userId,
        username: currentUser.username,
        timestamp: new Date()
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});