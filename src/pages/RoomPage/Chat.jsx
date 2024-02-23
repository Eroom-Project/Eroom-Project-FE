import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Chat({ challengeId, memberId, title }) {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [chatList, setChatList] = useState([]);
  
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
          type: 'JOIN',
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
          if (receivedMessage.type === 'JOIN') {
            setMessages((prevMessages) => [
              ...prevMessages,
              { message: `${receivedMessage.sender}님이 입장하셨습니다.` },
            ]);
            setChatList(prevList =>{
              const isExisting = prevList.some(user => user.memberId === receivedMessage.memberId);
              if(!isExisting) {
                return [...prevList, {
                  memberId : receivedMessage.memberId,
                  sender : receivedMessage.sender,
                  profileImageUrl :receivedMessage.profileImageUrl
                }]
              }
              return prevList
            })
          } else if(receivedMessage.type === 'LEAVE'){
            setMessages((prevMessages) => [
            ...prevMessages,
            { message: `${receivedMessage.sender}님이 나가셨습니다.` },
          ]);
        setChatList(prevList => prevList.filter(user => user.memberId !== receivedMessage.memberId))
        } else if(receivedMessage.type === 'CHAT'){
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
      alert('메시지를 너무 자주 보내지 마세요.');
      return; 
    }

    if (stompClient && stompClient.connected && newMessage.trim() !== '') {
      const chatMessage = {
        type: 'CHAT',
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
        width:'90vh',
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
        <img src='img/send.png' style={{width:'16px', height:'16px'}}/>
        메세지함
        </div>
        <div style={{
  display: 'flex',
  flexWrap: 'wrap', 
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #DADADA',
}}>
  {chatList.map((user, index) => (
    <div key={index} style={{ display: 'flex', flexDirection:'column' ,alignItems: 'center', marginRight: '10px',gap:'5px', fontSize:'12px',fontWeight:'500' }}>
      <img src={user.profileImageUrl} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '15px', marginRight: '5px' }} />
      <span>{user.sender}</span>
    </div>
  ))}
</div>
    <div style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width: '360px',
      height: '80%',    
    }}>
    <div style={{
  width: '360px',
  height: '64%',
  marginBottom: '20px',
  // border: '2px solid black',
  overflow: 'auto',
  position: 'absolute',
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
      flexDirection: 'column',
      alignItems: message.type === 'CHAT' ? (memberId === message.memberId ? 'flex-end' : 'flex-start') : 'center',
      padding: '5px',
      maxWidth: '100%',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: memberId === message.memberId ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        maxWidth: '70%',
      }}
    >
      {/* 프로필 확이ㄴ 필요 */}
      {memberId !== message.memberId && message.type === 'CHAT' && (
        <div style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          width:'30px',
          height:'30px',
          backgroundColor:'white',
          backgroundImage:`url("${message.profileImageUrl}")`,
          backgroundPosition:'center',
          backgroundSize:'cover',
          border:'1px solid #ffffff',
          borderRadius:'50px',
          marginRight:'2px',
          marginTop:'5px'
        }}>
          
          </div>
        
      )}
      <div
        style={{
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: message.type === 'CHAT' ? (memberId === message.memberId ? '#CDFFB5' : '#b1daf7') : '#EFEFEF',
          border: message.messagesType === 'JOIN' || message.messagesType === 'LEAVE' ? '1px solid #DADADA' : 'none',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {message.type === 'CHAT' && memberId !== message.memberId && (
          <div style={{ fontWeight: '500', marginBottom: '5px', fontSize: '12px' }}>{message.sender}</div>
        )}
        <div style={{ fontSize: '14px' }}>{message.message}</div>
      </div>
    </div>
    {message.type === 'CHAT' && (
      <div style={{ fontSize: '9px',marginLeft:'40px' ,marginTop: '5px', alignSelf: memberId === message.memberId ? 'flex-end' : 'flex-start' }}>
        {formatDateTime(message)}
      </div>
    )}
  </div>
))}
  <div ref={messagesEndRef} />
</div>

      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        position:'absolute',
        bottom:'30px',
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
      
      ><img src={'img/send.png'} style={{
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
