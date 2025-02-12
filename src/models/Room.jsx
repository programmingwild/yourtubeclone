// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  participants: [{
    userId: String,
    username: String,
    role: { type: String, enum: ['admin', 'member'], default: 'member' }
  }],
  isPrivate: { type: Boolean, default: true },
  inviteCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// models/Message.js
const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  sender: {
    userId: String,
    username: String
  },
  content: {
    type: { type: String, enum: ['text', 'file'], default: 'text' },
    text: String,
    fileUrl: String,
    fileName: String,
    fileSize: Number,
    fileType: String
  },
  encryptedContent: String,
  iv: String, // Initialization vector for encryption
  timestamp: { type: Date, default: Date.now }
});

module.exports = {
  Room: mongoose.model('Room', roomSchema),
  Message: mongoose.model('Message', messageSchema)
};

// models/Invitation.js
const invitationSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  inviteCode: { type: String, required: true, unique: true },
  createdBy: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  maxUses: { type: Number, default: 1 },
  usedCount: { type: Number, default: 0 }
});

module.exports = {
  Invitation: mongoose.model('Invitation', invitationSchema)
};