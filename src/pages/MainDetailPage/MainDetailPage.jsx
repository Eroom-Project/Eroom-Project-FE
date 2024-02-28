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
    
    const startDate = new Date(challengeDetail?.responseDto?.startDate);
    const dueDate = new Date(challengeDetail?.responseDto?.dueDate);
            dueDate.setDate(dueDate.getDate() + 1);
            console.log('aaaaaaaaaa',dueDate);
    const now = new Date();
    
    const butBack = startDate > now ? `#BBBBBB` : `#4f5aff`
    const butcolor = startDate > now ? `#000000` : `#ffffff`

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <img 
                src={challengeDetail?.responseDto?.thumbnailImageUrl} 
                alt={challengeDetail?.responseDto?.title}
                style={{ maxWidth: '430px', maxHeight: '250px', width: '430px', height: '250px', objectFit: 'contain',marginBottom:'10px',marginTop:'10px',}} 
            />
            
            <div style={{ width:'430px'}}>
                <StyledDiv style={{ maxHeight:'150px',overflow:'auto',marginBottom:'5px'}}>
                <div style={{fontSize:'18px',fontWeight:'800', marginBottom:'5px', lineHeight:'1.2'}}>
                    {challengeDetail?.responseDto?.title}
                </div>
                <div style={{fontSize:'14px', color:'#626262', marginBottom:'10px',marginTop:'10px'}}>
                    {translatedCategory}
                </div>
                
                <div style={{height:'90px', fontSize:'14px', marginBottom:'10px', lineHeight:'1.5', whiteSpace:'pre-wrap'}}>
                    {challengeDetail?.responseDto?.description}
                </div>
                </StyledDiv>            
                <div style={{height:'124px', backgroundColor:'#F2F2F2', display:'flex', alignItems:'center', padding:'0 20px',borderRadius:'4px',}}>
                    <div style={{marginRight:'20px', fontSize:'13px', fontWeight:'700'}}>
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
                <StyledButton onClick={() => {
                  
                    if (startDate > now) {
                        alert("챌린지가 시작되기 이전입니다.");
                    } else if(dueDate < now ){
                        alert("이미 종료된 챌린지 입니다.")
                    } else {
                        navigator('/room',{state:{challengeId: selectedItem?.challengeId, memberId: challengeDetail?.loginMemberId, title:challengeDetail?.responseDto?.title }});
                    }
                }} 
                backgroundColor = {dueDate < now ? 'black': butBack} color={dueDate > now ? 'white': butcolor}
                >{dueDate < now ? '챌린지가 종료되었습니다.':'챌린지 방 입장하기'}</StyledButton>
            ) : (
                <StyledButton onClick={() => {
                    if (isLoggedOut) {
                        alert("로그인이 필요합니다.");
                        navigator('/signin');
                    } else if(dueDate > now ){
                        alert("이미 종료된 챌린지 입니다.")
                    } else {
                        applyForChallenge(challengeDetail?.responseDto?.challengeId);
                        }
                }} backgroundColor= 'black' color='white'>{dueDate < now ? '챌린지가 종료되었습니다.':'참여 신청하기'}</StyledButton>
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
  color: ${props => props.color}; 
  font-size: 15px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;


   &:hover{
    background-color: ${props => props.backgroundColor}
   }
`;

const StyledDiv = styled.div`
  max-height: 150px;
  overflow: auto;
  margin-bottom: 5px;

  /* 웹킷 기반 브라우저용 스크롤 바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* 파이어폭스용 스크롤 바 숨기기 */
  scrollbar-width: none;
`;