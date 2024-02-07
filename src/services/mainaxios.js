import api from './api';

const getChallenge = async (show, searchQuery) => {
  let url = '/challenge';

  if (['IT', 'FOREIGN_LANGUAGE', 'MATH', 'SCIENCE', 'HUMANITIES', 'ARTS_AND_PHYSICAL_EDUCATION', 'ETC'].includes(show)) {
    url += `?category=${show}`;
    console.log('1번', url);
  }

  if (['LATEST', 'POPULAR'].includes(show)) {
    url += `?sort=${show}`;
    console.log('2번', url);
  }

  if (searchQuery) {
    url += `?query=${searchQuery}`;
    console.log('3번', url);
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

export { getChallenge, entryChallenge, createChallenge };
