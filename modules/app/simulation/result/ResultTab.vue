<template>
  <div class="w-full p-6 flex flex-col space-y-6">

    <AppLoaderPlaceholder v-if="!simulation" />

    <ResultRetirementGroupCard 
      v-for="(simulationRetirementGroup, index) in simulation.simulationRetirementGroups"
      :key="`retirementGroup${index}`"
      :simulationRetirementGroup="simulationRetirementGroup"
    ></ResultRetirementGroupCard>
  </div>
</template>

<script setup>

  import ResultRetirementGroupCard from '@/modules/app/simulation/result/ResultRetirementGroupCard'
  import GraphQL from "@/util/GraphQL"

  const route = useRoute()

  const simulation = ref(false)

  onMounted(() => {
    getSimulationRetirementGroups()
  })

  const getSimulationRetirementGroups = () => {
    const query = `

      {

        simulation ( 
          where: [
            { column: "id", value: "${route.params.simulationId}" }
          ]
        ) {
          simulationRetirementGroups  {
            id
            retirementGroup {
              id
              title
              description
              order
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

    GraphQL({ query }).then(({ data }) => {
      
      // Defines a minimum of 1s to the placeholder been appear
      const end = (new Date().getTime() - init)
      if(end > 1000) {
        simulation.value = data.simulation
        orderSimulationItems()
      } else {
        setTimeout(() => {
          simulation.value = data.simulation
          orderSimulationItems()
        }, (1000 - end))
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

</script>