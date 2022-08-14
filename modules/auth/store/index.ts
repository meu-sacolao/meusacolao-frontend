import { defineStore } from 'pinia'
import Api from '@/util/Api'
import User from '@/entities/User'
import { useAppSimulationStore } from '@/modules/app/simulation/store'
import { useUserSimulationStore } from '@/modules/user/simulation/store'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    loggedUser: null,
    loggedUserToken: null
  }),
  
  actions: {
    
    async login({ email, unencryptedPassword }) {
      return Api.post('/auth/login', { email, unencryptedPassword }).then(({ data }) => {
        this.loggedUserToken = data.token
        this.getLoggedUser(true)
      })
    },
    
    async signup({ name, email, phone, unencryptedPassword }) {
      return Api.post('/auth/signup', { name, email, phone, unencryptedPassword }).then(({ data }) => {
        this.loggedUserToken = data.token
        this.getLoggedUser(true)
      })
    },
    
    async googleLogin(code) {
      return Api.get(`/auth/googleLogin?code=${code}`)
      .then(({ data }) => {
        this.loggedUserToken = data.token
        this.getLoggedUser(true)
      })
    },
    
    async getLoggedUser(redirect = false) {
      const appSimulationStore = useAppSimulationStore()

      Api.get('/auth/getLoggedUser').then(({ data }) => {
        this.loggedUser = new User(data)
        appSimulationStore.attachSimulations()
        if(redirect) {
          this.redirect()
        }
      })
    },
    
    logout() {
      this.loggedUser = null
      this.loggedUserToken = null
    },
    
    redirect() {
      const router = useRouter()
      const userSimulationStore = useUserSimulationStore()
      // USER
      if(this.loggedUser.role === 'STANDARD') {
        userSimulationStore.getSimulations()
          .then(({ simulations }) => {
            if(simulations.length) router.push(`/minhas-simulacoes`)
          })
        
        // ADMIN
      } else {
        router.push(`/admin/simulations`)
      }
    }
  },
})