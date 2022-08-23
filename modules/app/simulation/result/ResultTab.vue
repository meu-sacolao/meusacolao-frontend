<template>
  <div class="w-full p-6 flex flex-col space-y-6">

    <AppLoaderPlaceholder v-if="!simulation" />

    <AppAlert type="info" v-if="simulation && retirementDateIsPreReform">As regras de aposentadoria pós-reforma estão disponíveis apenas para simulação com data de cálculo posteriores à 12/11/2019</AppAlert>
    
    <ResultRetirementGroupCard 
      v-for="(simulationRetirementGroup, index) in simulation.simulationRetirementGroups"
      :key="`retirementGroup${index}`"
      :simulationRetirementGroup="simulationRetirementGroup"
      :simulation="simulation"
    ></ResultRetirementGroupCard>

  </div>
</template>

<script setup>

  import ResultRetirementGroupCard from '@/modules/app/simulation/result/ResultRetirementGroupCard'
  import Api from "@/util/Api"
  import GraphQL from "@/util/GraphQL"
  import emitter from '@/util/emitter'
  import Dates from '@/services/Dates'
  import { useAppSimulationStore } from '@/modules/app/simulation/store'
  
  const route = useRoute()
  const appSimulationStore = useAppSimulationStore()

  const simulation = ref(false)

  const retirementDateIsPreReform = computed(() => {
    return Boolean(Dates.parse(simulation.value.retirementDate) < Dates.parse('2019-11-13'))
  })

  onMounted(() => {
    emitter.on('simulationUpdated', getSimulationRetirementGroups)
    emitter.on('reprocessSimulation', appSimulationStore.reprocessSimulation)
    getSimulationRetirementGroups()
  })

  onBeforeUnmount(() => {
    emitter.off('simulationUpdated')
  })

  const getSimulationRetirementGroups = () => {
    const query = `

      {

        simulation ( 
          where: [
            { column: "id", value: "${route.params.simulationId}" }
          ]
        ) {
          id
          retirementDate
          isPendingUpdate
          simulationRetirementGroups  {
            id
            retirementGroup {
              id
              title
              description
              order
              isPreReform
            }
            simulationRetirementOptions {
              id
              isGranted
              contextDate
              age
              contributionTime
              contributionsTotal
              requirements
              retirementOption {
                id
                title
                description
                order
                showForNotLoggedUsers
              }
            }
          }
        }
      }
    
    `

    const init = new Date().getTime()

    GraphQL({ query, delay: 1000 }).then(({ data }) => {

      if(data.simulation.isPendingUpdate) {
        appSimulationStore.reprocessSimulation()
      } else {
        simulation.value = data.simulation
        orderSimulationItems()
      }

    })

    const orderSimulationItems = () => {

      simulation.value.simulationRetirementGroups.sort((a, b) => {
        return a.retirementGroup.order - b.retirementGroup.order
      })

      simulation.value.simulationRetirementGroups.forEach((simulationRetirementGroup) => {
        simulationRetirementGroup.simulationRetirementOptions.sort((a, b) => {
          return a.retirementOption.order - b.retirementOption.order
        })
      })

      simulation.value.simulationRetirementGroups = simulation.value.simulationRetirementGroups.sort((a, b) => {
        return a.retirementGroup.order - b.retirementGroup.order
      })

    }

  }

  if(process.client) {
    const socket = inject('socket')
    if(!socket.connected) {
      socket.on("connect", () => {
        socket.emit('addSimulationListener', route.params.simulationId)
        socket.on('simulationProcessed', (payload) => {
          console.log('simulationProcessed received', payload)
          getSimulationRetirementGroups()
        })
      })
    } else {
      console.log('Inicializando socket no component simulações')
      socket.emit('addSimulationListener', route.params.simulationId)
      socket.on('simulationProcessed', (payload) => {
        console.log('simulationProcessed received', payload)
        getSimulationRetirementGroups()
      })
    }
  }

</script>