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
  import RelationTab from'@/modules/app/simulation/relation/RelationTab'
  import emitter from '@/util/emitter'
  import GraphQL from "@/util/GraphQL"

  import { getCurrentInstance } from 'vue'

  const route = useRoute()
  const simulation = ref(false)
  const isLoading = ref(false)

  const tabs = ref([
    {
      label: 'Resultado',
      value: 'result'
    },
    {
      label: 'Registros previdênciarios',
      value: 'social-security-relations'
    }
  ])

  const tabSelected = ref(tabs.value[0])

  onMounted(() => {
    getSimulation(true)
    emitter.on('simulationUpdated', getSimulation)
  })

  onBeforeUnmount(() => {
    emitter.off('simulationUpdated')
  })

  const getSimulation = () => {
    const query = `

      {

        simulation ( 
          where: [
            { column: "id", value: "${route.params.simulationId}" }
          ]
        ) {
          id
          retirementDate
          client {
            id
            name
            motherName
            email
            cpf
            nit
            gender
          }
        }
      }
    
    `

    GraphQL({ query }).then(({ data }) => {
      
      // Defines a minimum of 1s to the placeholder been appear
      simulation.value = data.simulation

    })
  }

  


  if(process.client) {
    const socket = inject('socket')
    if(!socket.connected) {
      socket.on("connect", simulationProcessed(socket))
    } else {
      simulationProcessed(socket)
    }
  }

  const simulationProcessed = (socket) => {
    console.log('Inicializando socket no component simulações')
    socket.emit('addSimulationListener', route.params.simulationId)
    socket.on('simulationProcessed', ({ time }) => {
      console.log('simulationProcessed received')
      getSimulation()
    })
  }

</script>
