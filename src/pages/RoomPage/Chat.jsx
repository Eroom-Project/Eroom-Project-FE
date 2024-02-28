import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';


function Chat({ challengeId, memberId, title }) {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
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


const navigate = useNavigate()

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault(); 
    }
  };
  const messagesEndRef = useRef(null);    

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageCount(0); 
    }, 1000);
  return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    const socket = new SockJS(`https://api.eroom-challenge.com/ws-stomp`);
    const client = new Client({
      brokerURL: `ws://api.eroom-challenge.com/ws-stomp`,
      webSocketFactory: () => socket,
     
      debug: function (str) {
        console.log('이벤트', str);
      },
      onConnect: () => {
        setStompClient(client);
  

       // JOIN 메시지 보내기
        const joinMessage = {
          type: 'JOIN',
          memberId: String(memberId),
          challengeId: String(challengeId),
          };
        
        client.publish({
          destination: `/pub/chat.sendMessage/${challengeId}`,
          body: JSON.stringify(joinMessage),
          });
                  
        client.subscribe(`/sub/chat/challenge/${challengeId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
                   
          if(Array.isArray(receivedMessage)){
            const memberIdCount = receivedMessage.reduce((acc, member) => {
              acc[member.memberId] = (acc[member.memberId] || 0) + 1;
              return acc;
          }, {});
  
          if(memberIdCount[memberId] > 1){
          alert('중복된 접속입니다.');
          navigate('/main');
          return; 
      }}
          
          //참가자 리스트 처리
          if (Array.isArray(receivedMessage) && receivedMessage.length > 0) {
            const updatedChatList = receivedMessage.map(user => ({
              sender: user.nickname,
              profileImageUrl: user.profileImageUrl
            }));
            setChatList(updatedChatList);
          }
          
          // "JOIN" 메시지 타입 처리
          if (receivedMessage.type === 'JOIN') {
            setMessages((prevMessages) => [
              ...prevMessages,
              { message: `${receivedMessage.sender}님이 입장하셨습니다.` },
            ]);
                     
          } else if(receivedMessage.type === 'LEAVE'){
            setMessages((prevMessages) => [
            ...prevMessages,
            { message: `${receivedMessage.sender}님이 나가셨습니다.` },
          ]);
                  
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
   
    if(isButtonDisabled){
  alert('채팅금지입니다. 잠시 후 다시 시도해주세요')
  return;
    }
    if (messageCount >= 3) {
      setIsButtonDisabled(true);
      setTimeout(() => setIsButtonDisabled(false), 5000); 
      alert('메시지를 너무 자주 보냈습니다. 5초 후 다시 시도해주세요.');
      return;
    }

    if (stompClient && stompClient.connected && newMessage.trim() !== '') {
      setMessageCount(prevCount => prevCount + 1);
      const chatMessage = {
        type: 'CHAT',
        message: newMessage,
        memberId: String(memberId),
        challengeId: String(challengeId),
      };
      
      stompClient.publish({
        destination: `/pub/chat.sendMessage/${challengeId}`,
        body: JSON.stringify(chatMessage),
      });

      setNewMessage('');
      
    }
  };
  
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div style={{
        fontSize:'24px',
        fontWeight:'700',
        height:'30px',
        width:'30vh',
        minWidth:'360px',
        maxWidth:'360px',
        marginBottom:'10px',
        overflow:'auto'
        
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
          marginTop:'5px',
          flexShrink:'0'
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
          overflowWrap:'break-word',
          wordBreak:'break-all',
          flexShrink: 1,
          minWidth: 0,
        }}
      >
        {message.type === 'CHAT' && memberId !== message.memberId && (
          <div style={{ fontWeight: '900', marginBottom: '5px', fontSize: '12px' }}>{message.sender}</div>
        )}
        <div style={{ fontSize: '14px', maxwidth:'245px' }}>{message.message}</div>
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
        maxLength={500}
        style={{
          width:'250px',
          border:'none',
          outline:'none'
        }}
        />
      <button onClick={sendMessage}  style={{
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
