import React from 'react';
import styled from 'styled-components';
import Modal from '../MainPage/modal';

const categoryMap = {
    IT: 'IT',
    HUMANITIES: '인문',
    MATH: '수학',
    SCIENCE: '과학',
    ARTS_AND_PHYSICAL_EDUCATION: '예체능',
    FOREIGN_LANGUAGE: '외국어',
    ETC: '기타',
  };
  

function MainDetailPage({ selectedItem, isOpen, onClose, applyForChallenge }) {
    
    const translatedCategory = categoryMap[selectedItem?.category] 

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <img 
                src={selectedItem?.image} 
                alt={selectedItem?.title}
                style={{ 
                    maxWidth: '430px', 
                    maxHeight: '220px',
                    width: '430px', 
                    height: '220px', 
                    objectFit: 'contain',
                    marginBottom:'20px',
                    marginTop:'30px',
                }} 
            />
            
            <div style={{ width:'430px' }}>
            <div style={{
                fontSize:'20px',
                fontWeight:'800',
                marginBottom:'5px'
            }}
            >{selectedItem?.title}</div>
            <div style={{
                fontSize:'14px',
                color:'#626262',
                marginBottom:'20px'
            }}
            > {translatedCategory}</div>
            
            <div style={{
                height:'65px',
                fontSize:'14px',
                marginBottom:'25px',
                lineHeight:'1.5'
            }}>
            {selectedItem?.description}
            </div>
                        
            <div style={{
                height:'124px',
                backgroundColor:'#F2F2F2',
                display:'flex',
                alignItems:'center',
                padding:'0 20px',
                borderRadius:'4px',
                
            }}>
                <div style={{
                    marginRight:'20px',
                    fontSize:'14px',
                    fontWeight:'700'                    
                    }}>
                    <div style={{marginBottom:'10px',}}>참여기간</div>
                    <div style={{marginBottom:'10px',}}>운영횟수</div>
                    <div style={{marginBottom:'10px',}}>참여인원</div>
                    <div>인증방식</div>
                    </div>

                <div style={{fontSize:'14px', color:'#626262'}}>
                    <div  style={{marginBottom:'10px',}}>{selectedItem?.startDate} ~ {selectedItem?.dueDate}</div>
                    <div  style={{marginBottom:'10px',}}>{selectedItem?.frequency}</div>
                    <div  style={{marginBottom:'10px',}}>{selectedItem?.currentAttendance}명 / {selectedItem?.limitAttendance}명</div>
                    <div>{selectedItem?.authExplanation}</div>
                </div>
        </div>
        </div>
           
            <button onClick={() => applyForChallenge(selectedItem?.challengeId)} style={{
                width:'430px',
                height:'48px',
                marginTop:'10px',
                backgroundColor:'#636363',
                border:'none',
                color: 'white',
                fontSize:'15px',
                borderRadius: '4px',
                fontWeight:'700'
            }}>참여 신청하기</button>
        </Modal>
    );
}

export default MainDetailPage;
