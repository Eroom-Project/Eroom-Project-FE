// 마이페이지 사용되는 axios 모듈

import api from "./api";

const getChallenge = async (show, searchQuery ) => {
    let url = '/challenge';
    if (['IT', '인문', '수학', '과학', '예체능', '기타'].includes(show)) {
      url += `?category=${show}`;
      console.log('1번', url);
      }
    if (['최신순', '인기순'].includes(show)) {
      url += `?sort=${show}`;
      console.log('2번', url);
    } 
    if(searchQuery) {
        url += `?query=${searchQuery}`;
        console.log('3번', url);
    }
  
    const response = await api.get(url);
    return response.data;
  };

  const entryChallenge = async (challengeId) =>{
    const response = await api.post(`/api/challenger/${challengeId}`);
    return response.data;
  }
  
  const createChallenge = async (formData) => {
    const response = await api.post('/challenges', formData);
    return response.data;
  };



export {getChallenge, entryChallenge, createChallenge}

