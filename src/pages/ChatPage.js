import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { chatAPI } from '../services/api';
import {
  initializeSocket,
  sendMessage,
  onReceiveMessage,
  disconnectSocket,
  userTyping,
  userStopTyping,
} from '../services/socketService';
import '../styles/Chat.css';

const ChatPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (user?.id) {
      initializeSocket(user.id);
      fetchConversations();

      // Listen for incoming messages
      onReceiveMessage((data) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await chatAPI.getConversations();
      setConversations(data.conversations);
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    try {
      const data = await chatAPI.getMessages(conversation.userId);
      setMessages(data.messages);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation) return;

    sendMessage(user.id, selectedConversation.userId, messageInput);
    setMessages((prev) => [
      ...prev,
      { senderId: user.id, message: messageInput, timestamp: new Date() },
    ]);
    setMessageInput('');
    userStopTyping(user.id, selectedConversation.userId);
  };

  const handleTyping = (e) => {
    setMessageInput(e.target.value);
    if (selectedConversation && !isTyping) {
      setIsTyping(true);
      userTyping(user.id, selectedConversation.userId);
      setTimeout(() => {
        setIsTyping(false);
        userStopTyping(user.id, selectedConversation.userId);
      }, 3000);
    }
  };

  if (loading) return <div className="loading">Loading chats...</div>;

  return (
    <div className="chat-container">
      <div className="conversations-list">
        <h2>💬 Conversations</h2>
        {conversations.length === 0 ? (
          <p className="no-conversations">No conversations yet</p>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.userId}
              className={`conversation-item ${
                selectedConversation?.userId === conversation.userId ? 'active' : ''
              }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <h4>{conversation.userName}</h4>
              <p className="last-message">{conversation.lastMessage?.substring(0, 50)}</p>
              <small>{new Date(conversation.timestamp).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>

      <div className="chat-window">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <h3>{selectedConversation.userName}</h3>
            </div>

            <div className="messages-container">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}
                >
                  <p>{msg.message}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={messageInput}
                onChange={handleTyping}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
