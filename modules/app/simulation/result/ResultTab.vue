<template>
  <div class="w-full p-6 flex flex-col space-y-6">
    <ResultRetirementGroupCard 
      v-for="(simulationRetirementGroup, index) in simulation.simulationRetirementGroups"
      :key="`retirementGroup${index}`"
      :simulationRetirementGroup="simulationRetirementGroup"
    ></ResultRetirementGroupCard>
  </div>
</template>

<script setup>

  import ResultRetirementGroupCard from '@/modules/app/simulation/result/ResultRetirementGroupCard'

  defineProps({
    simulation: Object
  })

</script>