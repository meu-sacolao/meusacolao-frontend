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

<script setup>
  import Api from '@/util/Api'
  import SimulationRetirementGroupCard from'./SimulationRetirementGroupCard'

  const route = useRoute()
  const simulation = ref(null)
  const isLoading = ref(false)

  onMounted(() => {
    get()
  })

  const get = () => {
    isLoading.value = true
    Api.get(`/simulation/show/${route.params.simulation_id}`)
      .then(({ data }) => {
        simulation.value = data.simulation
        isLoading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

</script>
