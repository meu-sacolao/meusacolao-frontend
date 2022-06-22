<template>
  <NuxtLayout name="main-app">
    <SimulationShow />
  </NuxtLayout>
</template>

<script>
import SimulationShow from '@/modules/app/simulation/SimulationShow'
export default {
  name: 'PageSimulation',
  components: { SimulationShow }
}
</script>
