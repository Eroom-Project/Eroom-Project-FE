import React from 'react'
import { io } from 'socket.io-client'


function Chat2() {

    const challengeId = 5
    const memberId = 2

    const user ={
    challengeId : 5,
    memberId : 2
    }
    
    const socket = io('/ws-stomp');
    // 서버로 메시지 보내기
    socket.emit('chat message', 'Hello, world!',challengeId, memberId );
    // 서버로부터 메시지 받기
    socket.on('chat message', (msg) => {
      console.log('Received message from server:', msg);
    });

  return (
    <div>chat2</div>
  )
}

export default Chat2