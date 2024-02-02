import React, { useState } from 'react';
import { getChallenge, entryChallenge } from '../../services/mainaxios';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import MainDetailPage from '../MainDetailPage/MainDetailPage';

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
  gap: 30px;
  margin: 10px;
`;

function MainPage() {
  // 상태 및 훅 사용
  const [show, setShow] = useState('');
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { isLoading, isError, data } = useQuery(['challenge', show, searchQuery],
   () => getChallenge(show, searchQuery), 
   {refetchOnWindowFocus: false, refetchInterval:30000});

  const mutation = useMutation(challengeId => entryChallenge(challengeId), {
    onSuccess: () => alert("참여 신청 성공!"),
    onError: () => alert("참여 신청 실패!")
  });

  // 이벤트 핸들러
  const applyForChallenge = (challengeId) => mutation.mutate(challengeId);
  const handleOptionChange = (value) => {
    setShow(value); 
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

  if (isLoading) return <h1>로딩중입니다.....!</h1>;
  if (isError) return <h1>오류가 발생하였습니다.</h1>;

  return (
    <>
      <div><h1>챌린지를 시작하세요</h1></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSearch}>검색</button>
      </div>
      {/* 카테고리 선택 영역 */}
      <OptionsContainer>
        {['IT', '인문', '수학', '과학', '예체능', '기타'].map(option => (
          <div key={option} onClick={() => handleOptionChange(option)}>{option}</div>
        ))}
      </OptionsContainer>
      
      <Line />
      {/* 정렬 선택 영역 */}
      <OptionsContainer style={{
        justifyContent:'flex-start'
      }}>
        {['최신순', '인기순'].map(sortOption => (
          <div key={sortOption} onClick={() => handleOptionChange(sortOption)}>{sortOption}</div>
        ))}
      </OptionsContainer>
      <div style={{ display: 'flex', gap: '30px', height: '200px' }}>
        {data.map((item, index) => (
          <div key={index} onClick={() => openModal(item)}>
            <img src={item.image} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            <h1>{item.title}</h1>
            <p>{item.frequency}</p>
            <p>현재 {item.currentAttendance}명 / 총 {item.limitAttendance}명</p>
          </div>
        ))}
      </div>
      <MainDetailPage selectedItem={selectedItem} isOpen={isModalOpen} onClose={() => setModalOpen(false)} applyForChallenge={applyForChallenge} />
    </>
  );
}

export default MainPage