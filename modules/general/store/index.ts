import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
  persist: true,

  state: () => ({
    redirectTo: null
  }),

  actions: {

    setRedirectTo(redirectTo) {
      this.redirectTo = redirectTo
    },
    
    checkRedirectTo() {
      if(this.redirectTo) {
        window.location = this.redirectTo
      }
    }
  },
})