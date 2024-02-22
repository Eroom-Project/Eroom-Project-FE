import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Chat({ challengeId, memberId }) {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = new SockJS(`https://api.eroom-challenge.com/ws-stomp`);
    const client = new Client({
      brokerURL: `ws://api.eroom-challenge.com/ws-stomp`,
      webSocketFactory: () => socket,
      connectHeaders: {
        challengeId: String(challengeId),
      },
      debug: function (str) {
        console.log('지금 이런일이 일어나고 있어요!', str);
      },
      onConnect: () => {
        console.log('연결되었음!');
        setStompClient(client);
  
        // JOIN 메시지 보내기
        const joinMessage = {
          messagesType: 'JOIN',
          memberId: String(memberId),
          challengeId: String(challengeId),
          };

        console.log('조인 보냄', joinMessage);
        
        client.publish({
          destination: `/pub/chat.sendMessage/${challengeId}`,
          body: JSON.stringify(joinMessage),
        });
  
        // 구독 설정
        client.subscribe(`/sub/chat/challenge/${challengeId}`, (message) => {
          console.log('서버에서 보냈음', message.body);
          const receivedMessage = JSON.parse(message.body);
  
          // "JOIN" 메시지 타입 처리
          if (receivedMessage.sender === 'JOIN') {
            setMessages((prevMessages) => [
              ...prevMessages,
              { message: `${receivedMessage.sender}님이 입장하셨습니다.` },
            ]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              receivedMessage,
            ]);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
  
    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [challengeId, memberId. message]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const chatMessage = {
        messagesType: 'CHAT',
        message: newMessage,
        memberId: String(memberId),
        challengeId: String(challengeId),
      };
      console.log('채팅보냄', chatMessage);
      stompClient.publish({
        destination: `/pub/chat.sendMessage/${challengeId}`,
        body: JSON.stringify(chatMessage),
      });

      setNewMessage('');
    }
  };

  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>{message.message}</div>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
