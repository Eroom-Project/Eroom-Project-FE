import React, { useState } from 'react';
import { getChallenge, entryChallenge } from '../../services/mainaxios';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import MainDetailPage from '../MainDetailPage/MainDetailPage';
import { BiSearch } from 'react-icons/bi';

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
  width: 270px;
  height: 267px;
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
  width: 250px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;

const AttendanceText = styled.div`
  position: absolute; 
  top: 15px; 
  right: 15px; 
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const FrequencyText = styled.div`
  
  background-color: rgba(0, 0, 0, 0.1);
  color: #000000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const TitleText = styled.div`
  
  width:270px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 10px;
  white-space: nowrap;    
  text-overflow: ellipsis;
  overflow:hidden;
  
  `;

const MoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const FilterButton = styled.div`
  display: flex;
  justify-content : center;
  width : 40px;
  font-size: 14px;
  background-color: rgba(169, 169, 169, 0.3); 
  color: #000; 
  border-radius: 50px; 
  padding: 8px 16px; 
  cursor: pointer;
  &:hover {
    background-color: rgba(169, 169, 169, 0.5); 
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


function MainPage() {
  // 상태 및 훅 사용
  const [show, setShow] = useState('');
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState(12); // 초기에 보이는 아이템 수 (4개 * 3줄)

  const { isLoading, isError, data } = useQuery(
    ['challenge', show, searchQuery],
    () => getChallenge(show, searchQuery),
    { refetchOnWindowFocus: false, refetchInterval: 30000 }
  );

  const mutation = useMutation(
    (challengeId) => entryChallenge(challengeId),
    {
      onSuccess: () => alert('참여 신청 성공!'),
      onError: () => alert('참여 신청 실패!'),
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

  if (isLoading) return <h1>로딩중입니다.....!</h1>;
  if (isError) return <h1>오류가 발생하였습니다.</h1>;

  return (
    <>
      <div>
        <h1>챌린지를 시작하세요</h1>
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
      <CardsContainer>
      {data?.slice(0, visibleItems).map((item, index) => (
  <Card key={index} onClick={() => openModal(item)}>
    <CardImage src={item.image} alt={item.title} />
    
    <AttendanceText>
      {item.currentAttendance} / {item.limitAttendance} 명
    </AttendanceText>
    
    <TitleText>{item.title}</TitleText> 
    <FrequencyText>{item.frequency}</FrequencyText>
  </Card>
))}
      </CardsContainer>

      {visibleItems < data.length && (
        <MoreButton onClick={handleShowMore}>더보기</MoreButton>
      )}

      <MainDetailPage
        selectedItem={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        applyForChallenge={applyForChallenge}
      />
    </>
  );
}

export default MainPage;
