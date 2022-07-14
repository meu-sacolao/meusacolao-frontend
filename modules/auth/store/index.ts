import { defineStore } from 'pinia'
import Api from '@/util/Api'
import User from '@/entities/User'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    loggedUser: null,
    loggedUserToken: null
  }),

  actions: {

    async login({ email, password }) {
      return Api.post('/auth/login', { email, password }).then(({ data }) => {
        this.loggedUserToken = data.token
        this.getLoggedUser()
      })
    },

    async googleLogin(code) {
      return Api.get(`/auth/googleLogin?code=${code}`)
        .then(({ data }) => {
          this.loggedUserToken = data.token
          this.getLoggedUser()
        })
    },

    async getLoggedUser() {
      Api.get('/auth/getLoggedUser').then(({ data }) => {
        this.loggedUser = new User(data)
      })
    },

    logout() {
      this.loggedUser = null
      this.loggedUserToken = null
    }
  },
})