<template>
  <div class="w-full flex flex-col space-y-8">
    
    
    <div v-if="!isLoading && simulation" class="w-full flex flex-col space-y-8">

      <SimulationClientCard :client="simulation.client"></SimulationClientCard>

      <div class="w-full flex flex-col bg-white shadow hover:shadow-lg transition-shadow ease-in-out duration-300 bg-white border border-slate-100">


        <div class="w-full flex border-b border-zinc-100">
          <div 
            v-for="(tab, index) in tabs"
            :key="`simulation-tabs-${index}`"
            class="px-10 pt-4 pb-2 border-b-8 cursor-pointer"
            :class="[tab == tabSelected ? 'border-orange-400 hover:border-orange-500' : 'border-transparent hover:border-zinc-100']"
            @click="tabSelected = tab"
          >
            <h5 class="h5 mb-0">{{ tab.label }}</h5>
          </div>
        </div>

        <transition
          name="fade"
        >
          <div v-if="tabSelected.value === 'result'" class="p-6 flex flex-col space-y-6">
            <SimulationRetirementGroupCard 
              v-for="(simulationRetirementGroup, index) in simulation.simulationRetirementGroups"
              :key="`retirementGroup${index}`"
              :simulationRetirementGroup="simulationRetirementGroup"
            ></SimulationRetirementGroupCard>
          </div>
        </transition>

        <transition
          name="fade"
        >
          <div v-if="tabSelected.value === 'social-security-relations'" class="p-6 flex flex-col space-y-6">
            <RelationTab 
              :simulation="simulation"
            ></RelationTab>
          </div>
        </transition>


      </div>


    </div>

  </div>
</template>

<script setup>
  import Api from '@/util/Api'
  import SimulationRetirementGroupCard from'@/modules/app/simulation/SimulationRetirementGroupCard'
  import SimulationClientCard from'@/modules/app/simulation/SimulationClientCard'
  import RelationTab from'@/modules/app/simulation/relation/RelationTab.vue'
  import emitter from '@/util/emitter'

  const route = useRoute()
  const simulation = ref(null)
  const isLoading = ref(false)

  const tabs = ref([
    {
      label: 'Resultado',
      value: 'result'
    },
    {
      label: 'Registros trabalhistas',
      value: 'social-security-relations'
    }
  ])

  const tabSelected = ref(tabs.value[0])

  onMounted(() => {
    get(true)
    emitter.on('simulationUpdated', get)
  })

  onBeforeUnmount(() => {
    emitter.off('simulationUpdated')
  })

  const get = (first = false) => {
    if(first) isLoading.value = true
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
