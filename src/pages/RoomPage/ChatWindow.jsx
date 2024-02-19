import React, { useState } from 'react';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [users, setUsers] = useState(['재현', '우식', '신지', '경현', '은채']);
  const currentUser = '신지';

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      // 현재 시간을 포함한 메시지 객체 생성
      const now = new Date();
      const timeString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newMessage = {
        user: currentUser,
        text: messageInput,
        time: timeString 
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 사용자 목록 */}
      <div style={{
        flex: 0, 
        padding: '10px', 
        display: 'flex', 
        gap: '10px', 
        alignItems: 'center', 
        border: '1px solid #ccc', 
        marginBottom: '10px', 
        backgroundColor: 'white', 
        borderRadius: '6px'
      }}>
        {users.map((user, index) => (
          <div key={index} style={{
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            backgroundColor: '#C7B9FF', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center', 
            color: 'white'
          }}>
            {user}
          </div>
        ))}
      </div>
      {/* 채팅 내용 */}
<div style={{
  display: 'flex',
  flexDirection: 'column',
  height: '70vh', 
  overflowY: 'auto', 
  backgroundColor: 'white',
  padding: '10px', 
  marginBottom: '10px', 
  borderRadius: '6px' 
}}>
  {messages.map((message, index) => (
    <div key={index} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end', 
      marginBottom: '10px'
    }}>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#C7B9FF',
        color: 'black',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '40%',
        fontSize:'15px'
      }}>
        {message.text}
      </div>
      <div style={{
        color: 'gray',
        padding: '5px',
        fontSize:'10px'
      }}>
        {message.time} 
      </div>
    </div>
  ))}
</div>
      
      {/* 메시지 입력창 */}
      <div style={{ 
      display: 'flex', 
      alignItems: 'center'
      }}>
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{ 
            flexGrow: 1,
            marginRight: '10px', 
            height: '30px'            
          }}
        />
        <button onClick={handleSendMessage} style={{ height: '30px' }}>
          전송</button>
      </div>
    </div>
  );
}

export default ChatWindow;
