import { defineStore } from 'pinia';
import Api from '@/Api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
      user: JSON.parse(localStorage.getItem('user')),
      accessToken: localStorage.getItem('access-token')
  }),
  getters: {
    isLoggedIn: (state) => {
      return (state.accessToken && state.user);
    }
  },
  actions: {
    async login(email, password) {
      return await new Promise(async (resolve, reject) => {
        Api.post(`/login`, { 
          email: email,
          password: password
        }).then(res => {
          this.user = res.user;
          this.accessToken = res.accessToken;
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('access-token', res.accessToken);
          resolve(res);
        })
        .catch(err => {
          localStorage.removeItem('access-token');
          localStorage.removeItem('user');
          reject(err);
        });
      });
    },
    logout() {
      localStorage.removeItem('access-token');
      localStorage.removeItem('user');
      window.location.href = "/auth";
    }
  }
});
