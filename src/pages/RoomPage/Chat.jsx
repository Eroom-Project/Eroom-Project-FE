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
        console.log('Connected');
        setStompClient(client);
        
        console.log(client)
                
        // 구독 설정
        client.subscribe(
          `/sub/chat/challenge/${challengeId}`,
          (message) => {
            console.log('aaaaaaaaaaaaaaaa', message.body ); // 파싱된 메시지 내용을 출력
            const receivedMessage = JSON.parse(message.body );
            setMessages((prevMessages) => [
              ...prevMessages,
              receivedMessage,
            ]);
            console.log('bbbbbbbbbbbbbbbbb',receivedMessage ); // 파싱된 메시지 내용을 출력
          },
          );
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
  }, [challengeId, memberId]); 
  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const ChatMessage = {
        messagesType: 'CHAT',
        message: newMessage,
        memberId: String(memberId),
        challengeId: String(challengeId),

        };
      console.log('Sending message', ChatMessage);
      stompClient.publish({
        destination: `/pub/chat.sendMessage/${challengeId}`,
        body: JSON.stringify(ChatMessage),
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
