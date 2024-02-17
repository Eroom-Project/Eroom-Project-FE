import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const socket = socketIOClient('/ws-stomp'); 

  useEffect(() => {
   
    socket.on('chat message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      
      socket.disconnect();
    };
  }, [messages, socket]);

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      socket.emit('chat message', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSendMessage}>전송</button>
    </div>
  );
}

export default ChatWindow;
