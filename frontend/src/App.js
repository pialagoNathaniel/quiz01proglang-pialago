import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Function to fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to send a new message to the backend
  const addMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
        setNewMessage('');
      } else {
        console.error('Error adding message:', data.error);
      }
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  // Load messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a new message"
      />
      <button onClick={addMessage}>Add Message</button>
    </div>
  );
}

export default App;