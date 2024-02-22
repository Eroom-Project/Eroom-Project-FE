import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Chat({ challengeId, memberId, title }) {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState(0);
  
  const formatDateTime = (receivedMessage) => {
    const utcDate = new Date(receivedMessage.time); 
    const koreanDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000)); 
    const year = koreanDate.getFullYear();
    const month = String(koreanDate.getMonth() + 1).padStart(2, '0');
    const day = String(koreanDate.getDate()).padStart(2, '0');
    const hours = String(koreanDate.getHours()).padStart(2, '0');
    const minutes = String(koreanDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};



  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault(); 
    }
  };
  const messagesEndRef = useRef(null);    

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


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
          if (receivedMessage.messagesType === 'JOIN') {
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
  }, [challengeId, memberId]);

  const sendMessage = () => {
    const now = Date.now();
    if (now - lastMessageTime < 500) { 
      alert('메시지를 너무 자주 보내지 마세요.'); // 사용자에게 경고
      return; 
    }

    if (stompClient && stompClient.connected && newMessage.trim() !== '') {
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
      setLastMessageTime(now); 
    }
  };
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div style={{
        fontSize:'24px',
        fontWeight:'700',
        height:'30px',
        width:'100%',
        marginBottom:'10px'
        
        }}>{title} </div>
      <div style={{
        display:'flex',
        alignItems:'center',
        gap:'5px',
        height:'50px',
        borderBottom:'1px solid #DADADA',
        borderTop:'1px solid #DADADA',
        fontSize:'16px',
        marginBottom:'10px'
        
        
      }}> 
        <img src='img/send.png' style={{width:'16px', height:'16px'}}/>메세지함
        </div>
    <div style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width: '360px',
      height: '900px',    
    }}>
    <div style={{
  width: '360px',
  height: '780px',
  marginBottom: '20px',
  // border: '2px solid black',
  overflow: 'auto',
  position: 'relative',
  WebkitOverflowScrolling: 'touch', 
  '::-webkit-scrollbar': { display: 'none' },
  msOverflowStyle: 'none', 
  scrollbarWidth: 'none', 
}}>
  {messages.map((message, i) => (
    <div 
      key={i}
      style={{
        display: 'flex',
        flexDirection:'column',
        alignItems: message.messagesType === 'CHAT' ? (memberId === message.memberId ? 'flex-end' : 'flex-start') : 'center',
        padding: '5px',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: message.messagesType === 'CHAT' ? (memberId === message.memberId ? '#CDFFB5' : '#b1daf7') : '#EFEFEF',
          border: message.messagesType === 'JOIN' || message.messagesType === 'LEAVE' ? '1px solid #DADADA' : 'none',
          textAlign: 'left',
        }}
      >
        {message.messagesType === 'CHAT' && memberId !== message.memberId && (
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{message.sender}</div>
        )}
        {message.message}
      </div>
      {message.messagesType === 'CHAT' && <div style={{ fontSize: '9px', marginTop: '5px' }}>{formatDateTime(message)}</div>}
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>

      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
          width:'330px',
          height:'35px',
          border: '1px solid #D2D2D2',
          borderRadius:'32px',
          padding:'0 10px',
          backgroundColor:'white'
          }} >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          width:'250px',
          border:'none',
          outline:'none'
        }}
        />
      <button onClick={sendMessage} style={{
        border:'none',
        backgroundColor:'white',
        cursor:'pointer'
      }}
      
      ><img src='img/send.png' style={{
        width:'15px',
        height:'15px',
        display:'flex'
        }}/></button>
      </div>
      
    </div>
    </div>
  );
}

export default Chat;
