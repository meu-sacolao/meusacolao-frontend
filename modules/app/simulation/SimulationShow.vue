<template>
  <div class="w-full flex flex-col space-y-8">
    
    
    <div v-if="!isLoading && simulation" class="w-full flex flex-col space-y-8">

      <CnisUserCard :user="simulation.user"></CnisUserCard>

      <SimulationRetirementGroupCard 
        v-for="(simulationRetirementGroup, index) in simulation.simulationRetirementGroups"
        :key="`retirementGroup${index}`"
        :simulationRetirementGroup="simulationRetirementGroup"
      ></SimulationRetirementGroupCard>

    </div>

  </div>
</template>

<script>
import Api from '@/util/Api'
export default {
  name: 'SimulationShow',
  data() {
    return {
      simulation: null,
      isLoading: true
    }
  },
  mounted() {
    this.show()
  },
  methods: {
    show() {
      this.isLoading = true
      Api.get(`/simulation/show/${this.$route.params.simulation_id}`)
        .then(({ data }) => {
          this.simulation = data.simulation
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
