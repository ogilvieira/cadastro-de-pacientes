import axios from 'axios';
import { useAuthStore } from "@/stores/authStore";

const ApiPrivate = axios.create({
  baseURL: '/api'
});


const handlerSuccess = (response) => {
  return response.data;
};

const handlerError = (err) => {
  const newError = err && err.response && err.response.data ? err.response.data : null;
  return Promise.reject(newError);
};

ApiPrivate.interceptors.response.use(handlerSuccess, handlerError);

const handlerRequest = function (config) {
  const authStore = useAuthStore();
  const token = authStore.accessToken || null;
  config.headers.Authorization = token ? `Bearer "${token}"` : null;

  return !token ? authStore.logout() : config;
};

ApiPrivate.interceptors.request.use(handlerRequest);

export default ApiPrivate;
