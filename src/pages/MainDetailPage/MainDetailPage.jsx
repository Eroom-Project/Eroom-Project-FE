import Modal from '../MainPage/modal';
import { detailchallenge } from '../../services/mainaxios'; 
import { useNavigate } from 'react-router-dom';
import {  useQuery } from 'react-query';
import styled from 'styled-components';


 
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
    
    const navigator = useNavigate();

    
    const { data: challengeDetail} = useQuery(['challengeDetail', selectedItem?.challengeId], () => detailchallenge(selectedItem?.challengeId), {
        enabled: !!selectedItem?.challengeId, 
    });

    const translatedCategory = categoryMap[challengeDetail?.responseDto?.category] || '';
    const isParticipating = challengeDetail?.responseDto?.currentMemberIdList?.includes(Number(challengeDetail?.loginMemberId))
    const isLoggedOut = challengeDetail?.loginMemberId === "No members logged in";

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <img 
                src={challengeDetail?.responseDto?.thumbnailImageUrl} 
                alt={challengeDetail?.responseDto?.title}
                style={{ maxWidth: '430px', maxHeight: '220px', width: '430px', height: '220px', objectFit: 'contain',marginBottom:'20px',marginTop:'30px',}} 
            />
            
            <div style={{ width:'430px' }}>
                <div style={{fontSize:'20px',fontWeight:'800', marginBottom:'5px'}}>
                    {challengeDetail?.responseDto?.title}
                </div>
                <div style={{fontSize:'14px', color:'#626262', marginBottom:'20px'}}>
                    {translatedCategory}
                </div>
                
                <div style={{height:'65px', fontSize:'14px', marginBottom:'25px', lineHeight:'1.5'}}>
                    {challengeDetail?.responseDto?.description}
                </div>
                            
                <div style={{height:'124px', backgroundColor:'#F2F2F2', display:'flex', alignItems:'center', padding:'0 20px',borderRadius:'4px',}}>
                    <div style={{marginRight:'20px', fontSize:'14px', fontWeight:'700'}}>
                        <div style={{marginBottom:'10px',}}>참여기간</div>
                        <div style={{marginBottom:'10px',}}>운영횟수</div>
                        <div style={{marginBottom:'10px',}}>참여인원</div>
                        <div>인증방식</div>
                    </div>

                    <div style={{fontSize:'14px', color:'#626262'}}>
                        <div style={{marginBottom:'10px',}}>{challengeDetail?.responseDto?.startDate} ~ {challengeDetail?.responseDto?.dueDate}</div>
                        <div style={{marginBottom:'10px',}}>{challengeDetail?.responseDto?.frequency}</div>
                        <div style={{marginBottom:'10px',}}>{challengeDetail?.responseDto?.currentAttendance}명 / {challengeDetail?.responseDto?.limitAttendance}명</div>
                        <div>{challengeDetail?.responseDto?.authExplanation}</div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
    
            {isParticipating ? (
                <StyledButton onClick={() => { navigator('/room',{state:{challengeId: selectedItem?.challengeId, memberId: challengeDetail?.loginMemberId}}); }} 
                backgroundColor = '#4f5aff'
                >챌린지방 입장하기</StyledButton>
            ) : (
                <StyledButton onClick={() => {
                    if (isLoggedOut) {
                        alert("로그인이 필요합니다.");
                        navigator('/signin');
                    } else {
                        applyForChallenge(challengeDetail?.responseDto?.challengeId);
                        }
                }} backgroundColor= 'black'>참여 신청하기</StyledButton>
            )}
</div>


        </Modal>
    );
}

export default MainDetailPage;

const StyledButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  width: 430px;
  height: 48px;
  margin-top: 10px;
  background-color: ${props => props.backgroundColor}; 
  border: none;
  color: white;
  font-size: 15px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;

   &:hover{
    background-color: ${props => props.backgroundColor}
   }
`;