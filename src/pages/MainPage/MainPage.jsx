//날짜가 지난 데이터는 보여주지 않는다.

import React, { useState } from 'react';
import { getChallenge, entryChallenge } from '../../services/mainaxios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import MainDetailPage from '../MainDetailPage/MainDetailPage';
import { BiSearch } from 'react-icons/bi';



function MainPage() {
  // 상태 및 훅 사용
  const [show, setShow] = useState('');
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState(12); // 초기에 보이는 아이템 수 (4개 * 3줄)


  const queryClient = useQueryClient();


  const { isLoading, isError, data } = useQuery(
    ['challenge', show, searchQuery],
    () => getChallenge(show, searchQuery),
    { refetchOnWindowFocus: false }
  );

    const mutation = useMutation(
    (challengeId) => entryChallenge(challengeId),
    {
      onSuccess: (data) => {const successMessage = data?.message || '챌린지 신청 성공!';
      alert(successMessage);
      queryClient.invalidateQueries('challenge'); // 쿼리 갱신
      },
      
      onError: (error) => {
        const errorMessage = error.response?.data?.message || '참여 신청 실패!';
        alert(errorMessage);
      }
    }
  );
  
  const categoryMap = {
    IT: 'IT',
    인문: 'HUMANITIES',
    수학: 'MATH',
    과학: 'SCIENCE',
    예체능: 'ARTS_AND_PHYSICAL_EDUCATION',
    외국어: 'FOREIGN_LANGUAGE',
    기타: 'ETC',
  };
  const SortMap = {
    '인기순': 'POPULAR',
    '최신순': 'LATEST',
  };

  // 이벤트 핸들러
  const applyForChallenge = (challengeId) => mutation.mutate(challengeId);

  const handleOptionChange = (value) => {
    const keyword = categoryMap[value] || SortMap[value];
    setShow(keyword);
    setSearchQuery(''); 
  };

  const handleSearch = () => {
    setSearchQuery(input);
    setShow('');
    setInput('');
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 12);
  };

  return (
    <div>
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage: 'URL(/img/MainHeaderImg.png)',
        backgroundSize:'cover',
        backgroundPosition:'center',
        width:'100%',
        height:'300px',
        marginBottom:'60px'
      }}>
        <div style={{
          fontSize:'40px',
          fontWeight:'900'
        }}>챌린지를 시작하세요!</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchContainer>
          <SearchInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='함께하고 싶은 챌린지를 찾아보세요!'
          />
          <SearchButton onClick={handleSearch}>
            <BiSearch size={20} color='#6c6c6c' />
          </SearchButton>
        </SearchContainer>
      </div>
      <OptionsContainer>
  {Object.keys(categoryMap).map((option) => (
    <FilterButton
      key={option}
      onClick={() => handleOptionChange(option)}
      style={{
        marginTop: '20px',
      }}
    >
      {option}
    </FilterButton>
  ))}
</OptionsContainer>
      <Line />
      <OptionsContainer style={{ justifyContent: 'flex-start',  cursor: 'pointer', marginBottom:'10px',marginTop:'10px' }}>
        {Object.keys(SortMap).map((option) => (
          <div key={option} onClick={() => handleOptionChange(option)}>
            {option}
          </div>
        ))}
      </OptionsContainer>
      {isLoading && <FeedbackContainer>
        <img src='img/icon (5).png' alt='로딩이미지'/>
        로딩중입니다.</FeedbackContainer>}
      {isError && <FeedbackContainer>
        <img src='img/icon (6).png' alt='에러이미지'/>
        오류가 발생했습니다.</FeedbackContainer>}
      <CardsContainer>
      {Array.isArray(data) && data?.slice(0, visibleItems).map((item, challengeId) => (
  <Card key={challengeId} onClick={() => openModal(item)}>
    <CardImage src={item.thumbnailImageUrl} alt={item.title} />
    
    <AttendanceText>
      {item.currentAttendance} / {item.limitAttendance} 명 <img src='img/userIcon.png'/>
    </AttendanceText>
    
    <FrequencyText>{item.frequency}</FrequencyText>
    <TitleText>{item.title}</TitleText> 
    <Nickname>{item.nickname}</Nickname>
    
  </Card>
))}
      </CardsContainer>

      {visibleItems < data?.length && (
        <MoreButton onClick={handleShowMore}>더보기</MoreButton>
      )}

      <MainDetailPage
        selectedItem={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        applyForChallenge={applyForChallenge}
      />
    </div>
  );
}

export default MainPage;

// 스타일 컴포넌트 정의

const Line = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 10px;
  width: 1200px;
  margin: 0 auto; 
  font-size: 15px;
  font-weight: 500;
  `;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4개의 카드가 한 줄에 표시됩니다.
  gap: 20px;
  margin-bottom: 20px;
  width: 1200px;
  justify-content: center;
  margin: 0 auto;
`;

const Card = styled.div`
  width: 284px;
  height: 320px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  white-space: nowrap;    
  text-overflow: ellipsis;
  overflow:hidden;
  cursor: pointer;       
  `;

const CardImage = styled.img`
  width: 284px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  `;

const AttendanceText = styled.div`
  display:flex;
  gap:2px;
  position: absolute; 
  top: 15px; 
  right: 15px; 
  background-color: #FFE5B3  ;
  color: #D75329;
  padding: 4px 4px;
  border-radius: 4px;
  font-size: 12px;
`;

const FrequencyText = styled.div`
  
  background-color: #F87C54;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-top:20px;
`;

const TitleText = styled.div`
  width:230px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 10px;
  white-space: nowrap;    
  text-overflow: ellipsis;
  overflow:hidden;
  `;

const Nickname = styled.div`
  font-size : 14px;
  color : #9D9D9D;
`

const MoreButton = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight:500;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const FilterButton = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  justify-content : center;
  width : 80px;
  font-size: 15px;
  font-weight: 500;
  background-color: #FFE0A5;
  color: #87300A;
  border-radius: 50px; 
  padding: 8px 16px; 
  cursor: pointer;
  &:hover {
    background-color:  #f7b946;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 333px;
  height: 36px;
  border: 1px solid #6c6c6c;
  border-radius: 50px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0 10px;
  border: none;
  border-radius: 50px;
  outline: none;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 10px;
`;

const FeedbackContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  font-size:20px;
  font-weight:500;
  margin-top: 100px;
  gap:10px;
`;

