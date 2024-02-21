import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Chat({ challengeId, memberId  }) {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  


  useEffect(() => {
    // SockJS와 Stomp 클라이언트 초기화
    const socket = new SockJS(`https://api.eroom-challenge.com/ws-stomp`);
    const client = new Client({
      brokerURL:`ws://api.eroom-challenge.com/ws-stomp`,
      webSocketFactory: () => socket, 
      
      debug: function (str) {
        console.log('상태!', str);
      },
      onConnect: () => {
        console.log('연결됨');
        setStompClient(client);



        console.log(`memberId 타입: ${typeof Number(memberId)}, challengeId 타입: ${typeof challengeId}`);


        // 구독 설정
        client.subscribe(
          `/sub/chat/challenge/${challengeId}`,
          (message) => {
            const receivedMessage = JSON.parse(message);
            console.log('메세지 받음~', receivedMessage);
            setMessages((prevMessages) => [
              ...prevMessages,
              receivedMessage,
            ]);
          },
          { memberId :Number(memberId), challengeId, type: 'JOIN' } // 헤더에 타입 지정
        );
      },
      // 연결 오류 시 처리
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    // Stomp 클라이언트 연결
    client.activate();

    return () => {
      // 컴포넌트 언마운트 시 연결 해제
      if (client.active) {
        client.deactivate();
      }
    };
  }, [challengeId]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const ChatMessage = {
        MessageType : 'CHAT',
        message: newMessage,
        sender : '재현'
       
      };
      console.log('내가간다',ChatMessage)
      // 메시지 전송
      stompClient.publish({
        destination: '/pub/chat.sendMessage',
        body: JSON.stringify(ChatMessage),
        headers: {
          memberId :Number(memberId),
          challengeId
        }
      });

      setNewMessage('');
    }
  };

  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>{message.content}</div>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
