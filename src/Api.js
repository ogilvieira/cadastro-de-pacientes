import axios from 'axios';

const Api = axios.create({
  baseURL: '/api'
});

const handlerSuccess = (response) => {
  return response.data;
};

const handlerError = (err) => {
  const newError = err && err.response && err.response.data ? err.response.data : null;
  return Promise.reject(newError);
};

Api.interceptors.response.use(handlerSuccess, handlerError);


export default Api;
