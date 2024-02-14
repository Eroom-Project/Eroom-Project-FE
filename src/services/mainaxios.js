import api from './api';

const getChallenge = async (show, searchQuery) => {
  let url = '/challenge';
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
  const response = await api.post(`/api/challenger/${challengeId}`);
  return response.data;
};

const createChallenge = async (formData) => {
  const response = await api.post('/challenges', formData);
  return response.data;
};

const challengeAuth = async (formData, challengerId) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }};
  const response = await api.post(`/api/challenger/${challengerId}/auth`, formData, config);
  return response.data;
};

const authResult = async (challengerId) =>{
  const response = await api.get(`/auth`)
  return response.data;
}

export { getChallenge, entryChallenge, createChallenge, challengeAuth, authResult };
