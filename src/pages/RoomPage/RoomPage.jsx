import React, { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import AuthResult from '../AuthResultPage/AuthResultPage';

function RoomPage() {
    const [isChatOpen, setIsChatOpen] = useState(false); 
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isAuthResultOpen, setIsAuthResultOpen] = useState(false);

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            height: '100vh'
        }}>
            <div style={{
                position: 'absolute',
                left: '50%',
                bottom: '100px',
                transform: 'translate(-50%, 0)',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                
            }}>
                <img src='/iso1.jpg' style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                }}/>
                <div style={{
                    display: 'flex',
                    gap: '10px', 
                    marginTop: '20px',
                }}>
                    <button onClick={() => setIsAuthOpen(true)} style={{
                        fontFamily:'Noto Sans KR, sans-serif',
                        width:'150px',
                        height:'48px',
                        backgroundColor:'#636363',
                        border:'none',
                        color: 'white',
                        fontSize:'15px',
                        borderRadius: '4px',
                        fontWeight:'500',
                        cursor: 'pointer'
                    }}>챌린지 인증하기</button>

                    <button onClick={() => setIsAuthResultOpen(true)} style={{
                        fontFamily:'Noto Sans KR, sans-serif',
                        width:'150px',
                        height:'48px',
                        backgroundColor:'#636363',
                        border:'none',
                        color: 'white',
                        fontSize:'15px',
                        borderRadius: '4px',
                        fontWeight:'500',
                        cursor: 'pointer'
                    }}>인증확인하기</button>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                top: '50%', 
                right: isChatOpen ? '500px' : '20px', 
                transform: 'translateY(-50%)', 
                zIndex: 20, 
            }}>
                <button onClick={() => setIsChatOpen(!isChatOpen)} style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    left: '-40px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(0deg)'
                }}>
                    {isChatOpen ? '>' : '<'}
                </button>
            </div>
            {isChatOpen && (
                <div style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: '500px', 
                    height: '100%', 
                    backgroundColor: '#f4f4f4', 
                    borderLeft: '1px solid #ccc', 
                    padding: '20px', 
                    boxShadow: '-2px 3px rgba(0,0,0,0.1)', 
                }}>
                    <div>채팅창 내용 여기에 적자</div>
                </div>
            )}

            <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <AuthResult isOpen={isAuthResultOpen} onClose={() => setIsAuthResultOpen(false)} />
        </div>
    );
}

export default RoomPage;
