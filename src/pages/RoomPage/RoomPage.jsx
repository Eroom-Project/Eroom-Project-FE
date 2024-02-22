import React, { useEffect, useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import AuthResult from '../AuthResultPage/AuthResultPage';
import Chat from './Chat';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

function RoomPage() {
    const [isChatOpen, setIsChatOpen] = useState(false); 
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isAuthResultOpen, setIsAuthResultOpen] = useState(false);
    const location = useLocation();
    const { challengeId,  memberId, title } = location.state || {};
    
    

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            height: '100vh'
        }}>
           <div style={{
                backgroundImage:'url(img/RoomBackImg.png)',
                width:'1200px',
                height:'980px',
                backgroundPosition:'center',
                backgroundSize:'cover',
                position:'relative'
                }}>
                
                <div style={{
                display: 'flex',
                gap: '10px',
                position: 'absolute',
                bottom: '30px', 
                left: '30px', 
                }}>
                    <button onClick={() => setIsAuthOpen(true)} style={{
                        fontFamily:'Noto Sans KR, sans-serif',
                        width:'160px',
                        height:'48px',
                        backgroundColor:'#FFFFFF',
                        border:'1px solid black',
                        color: 'black',
                        fontSize:'15px',
                        borderRadius: '6px',
                        fontWeight:'500',
                        cursor: 'pointer'
                    }}>챌린지 인증하기</button>

                    <button onClick={() => setIsAuthResultOpen(true)} style={{
                        fontFamily:'Noto Sans KR, sans-serif',
                        width:'160px',
                        height:'48px',
                        backgroundColor:'#FFFFFF',
                        border:'1px solid black',
                        color: 'black',
                        fontSize:'15px',
                        borderRadius: '6px',
                        fontWeight:'500',
                        cursor: 'pointer'
                    }}>인증확인하기</button>
                </div>
                <div style={{
                position: 'absolute',
                top: '9%', 
                right: isChatOpen ? '500px' : '150px', 
                transform: 'translateY(-50%)', 
                zIndex: 20, 
            }}>
                <button onClick={() => setIsChatOpen(!isChatOpen)} style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    left: '90px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(0deg)',
                    fontFamily:'Noto Sans KR, sans-serif',
                    fontSize:'20px',
                    backgroundColor:'black',
                    textAlign:'center',
                    color:'white',
                    border:'none',
                    borderRadius:'50px',
                    width:'40px',
                    height:'40px',
                    fontWeight:'1000'
                    }}>
                    {isChatOpen ? '>' : '<'}
                </button>
            </div>
            
                <div  style={{
                    position: 'absolute',
                    right: '0', 
                    width: '380px', 
                    height: '100%', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    // border: '1px solid #ccc', 
                    padding: '10px', 
                    boxShadow: '-2px 3px rgba(0,0,0,0.1)',
                    display: isChatOpen ? 'block' : 'none', 
}}>
                    <Chat challengeId={challengeId} memberId ={memberId} title={title} />
                </div>

                </div>
                
            <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} challengeId={challengeId}  />
            <AuthResult isOpen={isAuthResultOpen} onClose={() => setIsAuthResultOpen(false)} challengeId={challengeId} />
        </div>
    );
}

export default RoomPage;
