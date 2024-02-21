import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Chat({ challengeId, memberId }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('/ws-stomp');
    setSocket(newSocket);

    // console.log(`챌린지 아이디: ${challengeId} ///  멤버 아이디: ${memberId}`);

    newSocket.emit('join room', { challengeId, memberId });
    // console.log(`입장 요청  챌린지 아디: ${challengeId} 멤버아디: ${memberId}`);

    newSocket.on('receive message', (message) => {
      // console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // console.log('연결 끈김');
      newSocket.close();
    };
  }, [challengeId, memberId]);

  const sendMessage = () => {
    // console.log(`테스트 메세시지: '안녕하세요', 챌린지아디: ${challengeId} 멤버아디: ${memberId}`);
    socket.emit('send message', { message: '안녕하세요', challengeId, memberId });
  };

  return (
    <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '6px' }}>
      <button onClick={sendMessage} style={{
        backgroundColor: '#C7B9FF', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '10px 20px', 
        cursor: 'pointer'
      }}>
        메시지 보내기
      </button>
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: 'gray' }}>수신 메시지:</h2>
        <ul style={{
          listStyle: 'none', 
          padding: 0
        }}>
          {messages.map((msg, index) => (
            <li key={index} style={{
              backgroundColor: '#f0f0f0', 
              padding: '10px', 
              marginBottom: '10px', 
              borderRadius: '10px'
            }}>
              {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
