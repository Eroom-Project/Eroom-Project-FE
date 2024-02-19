import React, { useEffect, useState } from 'react';
import Modal from '../MainPage/modal';
import { detailchallenge } from '../../services/mainaxios'; 
import { useNavigate } from 'react-router-dom';


 
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
    const [challengeDetail, setChallengeDetail] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        if (selectedItem?.challengeId) {
            detailchallenge(selectedItem.challengeId).then(data => {
                setChallengeDetail(data);
            }).catch(error => {
                console.error("챌린지를 불러오는데 실패했습니다.", error);
            });
        }
    }, [selectedItem]);

    const translatedCategory = categoryMap[challengeDetail?.category] || '';

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <img 
                src={challengeDetail?.thumbnailImageUrl} 
                alt={challengeDetail?.title}
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
                }}>
                    {challengeDetail?.title}
                </div>
                <div style={{
                    fontSize:'14px',
                    color:'#626262',
                    marginBottom:'20px'
                }}>
                    {translatedCategory}
                </div>
                
                <div style={{
                    height:'65px',
                    fontSize:'14px',
                    marginBottom:'25px',
                    lineHeight:'1.5'
                }}>
                    {challengeDetail?.description}
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
                        <div style={{marginBottom:'10px',}}>{challengeDetail?.startDate} ~ {challengeDetail?.dueDate}</div>
                        <div style={{marginBottom:'10px',}}>{challengeDetail?.frequency}</div>
                        <div style={{marginBottom:'10px',}}>{challengeDetail?.currentAttendance}명 / {challengeDetail?.limitAttendance}명</div>
                        <div>{challengeDetail?.authExplanation}</div>
                    </div>
                </div>
            </div>
               <div style={{
                display:'flex',
                gap:'10px'
               }}>
            <button onClick={() => applyForChallenge(challengeDetail?.challengeId)} style={{
                fontFamily:'Noto Sans KR, sans-serif',
                width:'220px',
                height:'48px',
                marginTop:'10px',
                backgroundColor:'#636363',
                border:'none',
                color: 'white',
                fontSize:'15px',
                borderRadius: '4px',
                fontWeight:'500',
                cursor: 'pointer'
            }}>참여 신청하기</button>
             <button onClick={()=>{navigator('/room')}} style={{
                fontFamily:'Noto Sans KR, sans-serif',
                width:'220px',
                height:'48px',
                marginTop:'10px',
                backgroundColor:'#4f5aff',
                border:'none',
                color: 'white',
                fontSize:'15px',
                borderRadius: '4px',
                fontWeight:'500',
                cursor: 'pointer'
            }}>챌린지방 입장하기</button>
            </div>
        </Modal>
    );
}

export default MainDetailPage;
