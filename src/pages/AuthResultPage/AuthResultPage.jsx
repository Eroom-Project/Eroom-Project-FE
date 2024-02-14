import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import { authResult } from '../../services/mainaxios';

const AuthResult = ({ isOpen, onClose, challengerId }) => {
    const { data, isLoading, error } = useQuery('authResult', () => authResult(challengerId), {
        enabled: isOpen,
    });

    
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(prevIndex => prevIndex === index ? null : index);
    };

    if (!isOpen) return null;
    
    return ReactDOM.createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}>
            <form style={{
                width: '540px',
                height: '622px',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                
                position: 'relative',
            }}>
                
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    border: 'none',
                    fontSize: '20px',
                    color: '#C3C3C3'
                }}>
                    X
                </button>
                <div style={{
                    display: 'flex',
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '10px'
                }}>인증 확인하기</div>
                {isLoading && <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'20px',
        fontWeight:'500',
        marginTop: '100px',
        gap:'10px'
        }}>
        <img src='/icon (5).png' alt='로딩이미지'/>
        로딩중입니다.</div>}
      {error && <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'20px',
        fontWeight:'500',
        marginTop: '100px',
        gap:'10px'
        }}>
        <img src='/icon (6).png' alt='에러이미지'/>
        오류가 발생했습니다.</div>}
                {data?.map((item, index) => (
    <div key={index} style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease',
        width: '532px',
        maxHeight: expandedIndex === index ? '270px' : '100px',
    }}>
        <div onClick={() => toggleExpand(index)} style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between', 
            padding: '10px',
            width: '95%',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <img src={item?.authImageUrl} alt="" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    marginRight: '10px'
                }} />
                <div>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        marginBottom: '10px',
                    }}>{item?.authContents}</div>
                    <div style={{
                        fontSize: '12px',
                        color: '#A5A5A5'
                    }}>{item?.authId}</div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}>
                
                <button style={{
        fontFamily:'Noto Sans KR, sans-serif',
        fontSize:'15px',
        backgroundColor:'#636363',
        border:'1xp solid #636363',
        borderRadius:'6px',
        color:'white',
        width:'66px',
        height:'40px'}}>승인</button>
                <button style={{
        fontFamily:'Noto Sans KR, sans-serif',
        fontSize:'15px',
        backgroundColor:'#ffffff',
        border:'1xp solid #626262',
        borderRadius:'6px',
        color:'black',
        width:'66px',
        height:'40px'}}>거절</button>
                
                <div style={{
                    marginLeft:'15px'
                }}>{expandedIndex === index ? '︽' : '︾'}</div>
            </div>
        </div>
                        <div style={{ 
            display: expandedIndex === index ? 'block' : 'none',
            padding: '10px',
            backgroundColor : '#F2F2F2',
            width: '474px',
            height: '70px',
            borderRadius: '4px',
            margin: '0 auto 10px auto',
            alignItems: 'center'
            }}>
            <div>여기에 비디오 링크 나와여</div>
            <br />
            <div>여기에 내용이 나와요</div>
        </div>
        
        <div style={{
            display: expandedIndex === index ? 'flex' : 'none', 
            justifyContent: 'center',
            gap: '10px', 
            marginBottom: '10px',
            
            width: '100%', 
            }}>
    <button style={{
        fontFamily:'Noto Sans KR, sans-serif',
        fontSize:'15px',
        backgroundColor:'#636363',
        border:'1xp solid #636363',
        borderRadius:'6px',
        color:'white',
        width:'239px',
        height:'40px'


    }}>수정</button>
    <button style={{
        fontFamily:'Noto Sans KR, sans-serif',
        fontSize:'15px',
        backgroundColor:'#ffffff',
        border:'1xp solid #626262',
        borderRadius:'6px',
        color:'black',
        width:'239px',
        height:'40px'
        }}>삭제</button>
</div>
    </div>
))}
            </form>
        </div>,
        document.getElementById('modal-root')
    );
};

export default AuthResult;
