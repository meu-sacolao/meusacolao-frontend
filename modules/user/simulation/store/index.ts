import { defineStore } from 'pinia'
import UserSimulationApiService from '@/services/api/UserSimulationApiService'

export const useUserSimulationStore = defineStore('userSimulation', {

  persist: true,

  state: () => ({
    simulations: false
  }),

  actions: {

    getSimulations() {
      return UserSimulationApiService.get()
        .then(({ simulations }) => {
          this.simulations = simulations
          return { simulations }
        })
    }
  },
})