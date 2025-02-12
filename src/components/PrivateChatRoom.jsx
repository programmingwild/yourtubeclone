import React, { useState, useEffect } from "react";
import styles from "../styles/PrivateChatRoom.module.css";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import CryptoJS from "crypto-js";

const SECRET_KEY = "my_secure_key";

const encryptMessage = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

const decryptMessage = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "[Decryption Error]";
  }
};

const PrivateChatRoom = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("User" + Math.floor(Math.random() * 1000));
  const [groupName, setGroupName] = useState("Private Chat Room");
  const [newGroupName, setNewGroupName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [editingGroupName, setEditingGroupName] = useState(false);

  const [members, setMembers] = useState([username]);
  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    setIsTyping(messageText.length > 0);
  }, [messageText]);

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const encryptedText = encryptMessage(messageText);

    const newMessage = {
      id: Date.now(),
      user: username,
      text: encryptedText,
      timestamp: format(new Date(), "MMM d, yyyy - h:mm a"),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear all chats?")) {
      setMessages([]);
    }
  };

  const handleGroupNameChange = () => {
    if (newGroupName.trim() !== "") {
      setGroupName(newGroupName);
      setEditingGroupName(false);
    }
  };

  const handleAddMember = () => {
    if (newMember.trim() !== "" && !members.includes(newMember)) {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  const handleRemoveMember = (member) => {
    const updatedMembers = members.filter((m) => m !== member);
    setMembers(updatedMembers);
  };

  return (
    <motion.div
      className={styles.chatContainer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.chatHeader}>
        {editingGroupName ? (
          <div className={styles.groupNameEditor}>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
              className={styles.groupNameInput}
            />
            <button className={styles.saveGroupName} onClick={handleGroupNameChange}>
              ✅
            </button>
          </div>
        ) : (
          <span className={styles.groupName} onClick={() => setEditingGroupName(true)}>
            {groupName} ✏️
          </span>
        )}
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <button className={styles.clearButton} onClick={handleClearChat}>🗑 Clear Chat</button>
      </div>

      {/* Group Members Section */}
      <div className={styles.groupMembers}>
        <h3>Group Members</h3>
        <ul className={styles.memberList}>
          {members.map((member, index) => (
            <li key={index} className={styles.memberItem}>
              {member}
              {member !== username && (
                <button className={styles.removeMember} onClick={() => handleRemoveMember(member)}>❌</button>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.addMemberContainer}>
          <input
            type="text"
            placeholder="Enter member name"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            className={styles.addMemberInput}
          />
          <button className={styles.addMemberButton} onClick={handleAddMember}>➕ Add</button>
        </div>
      </div>

      <div className={styles.chatMessages}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={styles.message}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <p className={styles.messageUser}>{msg.user}</p>
              <p className={styles.messageText}>{decryptMessage(msg.text)}</p>
              <span className={styles.messageTimestamp}>{msg.timestamp}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && <p className={styles.typingIndicator}>Typing...</p>}
      </div>

      <div className={styles.chatInputContainer}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <motion.button
          className={styles.sendButton}
          onClick={handleSendMessage}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          Send
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PrivateChatRoom;
