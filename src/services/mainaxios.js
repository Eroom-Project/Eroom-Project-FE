import api from './api';

const getChallenge = async (show, searchQuery,pageNumver) => {
  let url = '/api/challenge';
  if (['IT', 'FOREIGN_LANGUAGE', 'MATH', 'SCIENCE', 'HUMANITIES', 'ARTS_AND_PHYSICAL_EDUCATION', 'ETC'].includes(show)) {
    url += `?category=${show}`;
  }
  if (['LATEST', 'POPULAR'].includes(show)) {
    url += `?sortBy=${show}`;
  }
  if (searchQuery) {
    url += `?query=${searchQuery}`;
  }
  if (pageNumver) {
    url += `?page=${pageNumver}`;
  }
  const response = await api.get(url);
  return response.data.data;
  };

const entryChallenge = async (challengeId) => {
  const resToken = await api.post(`/api/token`,{})
  const response = await api.post(`/api/challenge/${challengeId}`);
  return response.data;
};

const createChallenge = async (form) => {
  const resToken = await api.post(`/api/token`,{})
  const response = await api.post(`/api/challenge`, form);
  return response.data;
};

const challengeAuth = async (form, challengeId) => {
  const resToken = await api.post(`/api/token`,{})
  const response = await api.post(`/api/challenge/${challengeId}/auth`, form);
  return response.data;
};

const authResult = async (challengeId) =>{
  const resToken = await api.post(`/api/token`,{})
      const response = await api.get(`/api/challenge/${challengeId}/auth`)
      return response.data.data;
}

const postAuthStatus = async (authId, authStatus, challengeId) =>{
  const resToken = await api.post(`/api/token`,{})
  const payload ={authStatus : authStatus}
  const response = await api.put(`/api/challenge/${challengeId}/leader/auth/${authId}`, payload)
  return response.data;
}

const detailchallenge = async(challengeId) =>{
  const response = await api.get(`/api/challenge/${challengeId}`)
  return response.data.data;
}

const updateAuthStatus = async ({ authId, formData, challengeId }) => {
  const resToken = await api.post(`/api/token`,{})
  const response = await api.put(`/api/challenge/${challengeId}/auth/${authId}`, formData);
  return response.data;
};

const deleteAuthStatus = async ({challengeId, authId}) => {
  const resToken = await api.post(`/api/token`,{})
  const response = await api.delete(`/api/challenge/${challengeId}/auth/${authId}`);
  return response.data;
};

const eaditChallenge = async ({challengeId, form}) => {
  const resToken = await api.post(`/api/token`,{})
  const response = await api.put(`/api/challenge/${challengeId}`, form);
  return response.data;
};

const deleteChat = async ({challengeId, messageId}) => {
  const resToken = await api.post(`/api/token`,{})
  const response = await api.delete(`/api/chat/${challengeId}/${messageId}`);
  return response.data;
};



export { getChallenge, entryChallenge, createChallenge, challengeAuth, authResult, postAuthStatus, detailchallenge, updateAuthStatus, deleteAuthStatus, eaditChallenge,deleteChat };
