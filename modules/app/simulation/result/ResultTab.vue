<template>
  <div class="w-full p-6 flex flex-col space-y-6">

    <AppLoaderPlaceholder v-if="!simulation" />

    <ResultaTabProcessingLoader v-else-if="simulation.isPendingUpdate" />

    <div class="w-full flex flex-col space-y-6" v-else>
      <AppAlert type="info" v-if="retirementDateIsPreReform">As regras de aposentadoria pós-reforma estão disponíveis apenas para simulação com data de cálculo posteriores à 12/11/2019</AppAlert>
      
      <ResultRetirementGroupCard 
        v-for="(simulationRetirementGroup, index) in simulation.simulationRetirementGroups"
        :key="`retirementGroup${index}`"
        :simulationRetirementGroup="simulationRetirementGroup"
        :simulation="simulation"
      ></ResultRetirementGroupCard>
    </div>

  </div>
</template>

<script setup>

  import ResultRetirementGroupCard from '@/modules/app/simulation/result/ResultRetirementGroupCard'
  import ResultaTabProcessingLoader from '@/modules/app/simulation/result/ResultaTabProcessingLoader'
  import Api from "@/util/Api"
  import Simulation from "@/entities/Simulation"
  import GraphQL from "@/util/GraphQL"
  import emitter from '@/util/emitter'
  import Dates from '@/services/Dates'
  import { useAppSimulationStore } from '@/modules/app/simulation/store'
  
  const route = useRoute()
  const appSimulationStore = useAppSimulationStore()

  const props = defineProps({
    simulation: Simulation
  })

  onMounted(() => {
    if(props.simulation.isPendingUpdate) {
      appSimulationStore.reprocessSimulation()
    }
  })

  watch(() => props.simulation.isPendingUpdate, (newValue) => {
    if(newValue) {
      appSimulationStore.reprocessSimulation()
    }
  })

  const retirementDateIsPreReform = computed(() => {
    return Boolean(Dates.parse(props.simulation.retirementDate) < Dates.parse('2019-11-13'))
  })

</script>