import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm an AI assistant trained on Caleb's background. Ask me anything about his experience or projects.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage = { id: Date.now(), text: inputValue.trim(), sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Mock bot response (Frontend UI mock only)
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, text: "This is a mock response! The actual backend logic will be integrated later to handle your prompt.", sender: 'bot' }
      ]);
    }, 1000);
  };

  return (
    <motion.div 
      className="chatbot-container"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="chat-header">
        <Bot size={28} color="#ffffff" />
        <div>
          <div className="chat-header-title">Ask AI</div>
          <div className="chat-header-subtitle">Powered by Caleb's Knowledge Base</div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`message ${msg.sender}`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          className="chat-input"
          placeholder="Ask a question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="chat-send-btn" disabled={!inputValue.trim()}>
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );
};

export default Chatbot;
