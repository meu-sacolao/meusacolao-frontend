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
      Api.post('/auth/login', { email, password }).then(({ data }) => {
        this.loggedUserToken = data.token
        Api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        this.getLoggedUser()
      })
    },


    async getLoggedUser() {
      Api.get('/auth/getLoggedUser').then(({ data }) => {
        this.loggedUser = new User(data)
      })
    }
  },
})