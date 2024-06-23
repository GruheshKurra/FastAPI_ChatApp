// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8000/messages').then((response) => {
        setMessages(response.data);
      });

      connectWebSocket();
    }
  }, [user]);

  const connectWebSocket = () => {
    ws.current = new WebSocket('ws://localhost:8000/ws');
    
    ws.current.onopen = () => {
      console.log('WebSocket connected');
      toast.success('Connected to chat server');
    };
    
    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      toast.error('Disconnected from chat server');
      ws.current = null;
      
      // Attempt to reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    };
    
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('Error connecting to chat server');
    };
    
    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // Notify about new message if it's not from the current user
      if (newMessage.user !== user) {
        toast.info(`New message from ${newMessage.user}`);
      }
    };
  };

  const sendMessage = () => {
    if (input.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = { user, text: input };
      ws.current.send(JSON.stringify(message));
      setInput('');
    } else {
      toast.warn('Unable to send message. Please check your connection.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      setUser(usernameInput);
      toast.success(`Welcome, ${usernameInput}!`);
    }
  };

  if (!user) {
    return (
      <div className="App">
        <ToastContainer />
        <h1>Chat App</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <button type="submit">Join Chat</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <ToastContainer />
      <h1>Chat App</h1>
      <div className="user-info">Logged in as: {user}</div>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === user ? 'own-message' : ''}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;