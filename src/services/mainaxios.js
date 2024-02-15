import api from './api';

const getChallenge = async (show, searchQuery) => {
  // let url = '/challenge'; // 이거 지우고 아래꺼 살리기
  let url = '/api/challenge';
  if (['IT', 'FOREIGN_LANGUAGE', 'MATH', 'SCIENCE', 'HUMANITIES', 'ARTS_AND_PHYSICAL_EDUCATION', 'ETC'].includes(show)) {
    url += `?category=${show}`;
  }
  if (['LATEST', 'POPULAR'].includes(show)) {
    url += `?sort=${show}`;
  }
  if (searchQuery) {
    url += `?query=${searchQuery}`;
  }
  const response = await api.get(url);
  return response.data;
};

const entryChallenge = async (challengeId) => {
  const response = await api.post(`/api/challenge/${challengeId}`);
  return response.data;
};

const createChallenge = async (challengeCreateData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }};
  // const response = await api.post('/challenges', formData, config); // 이거 지우고 아래꺼 살리기
  const response = await api.post(`/api/challenge`, challengeCreateData, config);
  return response.data;
};

const challengeAuth = async (formData, challengeId) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }};
  const response = await api.post(`/api/challenge/${challengeId}/auth`, formData, config);
  return response.data;
};

const authResult = async (challengeId) =>{
  // const response = await api.get(`/auth`) // 이거 지우고 아래꺼 살리기
  const response = await api.get(`/api/challenge/${challengeId}/auth`)
  return response.data;
}

const postAuthStatus = async (authId, authStatus,challengeId) =>{
  const response = await api.post(`/api/challenge/${challengeId}/leader/auth/${authId}`,authId,authStatus)
  return response.data;
}

const detailchallenge = async(challengeId) =>{
  // const response = await api.get(`/challenge/${challengeId}`)
  const response = await api.get(`/api/challenge/${challengeId}`)
  return response.data;
}

const updateAuthStatus = async ({ challengeId, authId, formData }) => {
  const response = await api.put(`/api/challenge/${challengeId}/auth/${authId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteAuthStatus = async (challengeId, authId) => {
  const response = await api.delete(`/api/challenge/${challengeId}/auth/${authId}`);
  return response.data;
};


export { getChallenge, entryChallenge, createChallenge, challengeAuth, authResult, postAuthStatus, detailchallenge, updateAuthStatus, deleteAuthStatus };
