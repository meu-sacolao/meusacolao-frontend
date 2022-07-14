<template>
  <div class="w-full flex flex-col space-y-8">
    
    <AppLoaderPlaceholder v-if="!simulation" />

    <div v-else class="w-full flex flex-col space-y-8">

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

        <transition name="slide-left" mode="out-in" appear>
          <ResultTab 
            v-if="tabSelected.value === 'result'"
            :simulation="simulation"
          ></ResultTab>
          <RelationTab 
            v-else-if="tabSelected.value === 'social-security-relations'"
            :simulation="simulation"
          ></RelationTab>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Api from '@/util/Api'
  import ResultTab from'@/modules/app/simulation/result/ResultTab'
  import SimulationClientCard from'@/modules/app/simulation/SimulationClientCard'
  import RelationTab from'@/modules/app/simulation/relation/RelationTab.vue'
  import emitter from '@/util/emitter'

  const route = useRoute()
  const simulation = ref(false)
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
