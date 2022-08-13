<template>

  <div class="w-full p-6 flex flex-col space-y-6">

    <AppLoaderPlaceholder v-if="!socialSecurityRelations" />

    <RelationCard
      v-for="(socialSecurityRelation, index) in socialSecurityRelations"
      :key="`simulation-social-security-${index}`"
      :socialSecurityRelation="socialSecurityRelation"
    ></RelationCard>

    <ContributionEditModal />
    
  </div>

</template>

<script setup>

  import RelationCard from '@/modules/app/simulation/relation/RelationCard'
  import ContributionEditModal from '@/modules/app/simulation/relation/contribution/ContributionEditModal.vue'
  import GraphQL from "@/util/GraphQL"
  import emitter from '@/util/emitter'
  import Dates from '@/services/Dates'

  const route = useRoute()

  const socialSecurityRelations = ref(false)

  if(process.client) {
    const socket = inject('socket')
    socket.on('simulationProcessed', ({ time }) => {
      console.log('simulationProcessed received')
      getSimulationSocialSecurityRelations()
    })
  }

  onMounted(() => {
    emitter.on('simulationUpdated', getSimulationSocialSecurityRelations)
    getSimulationSocialSecurityRelations()
  })

  onBeforeUnmount(() => {
    emitter.off('simulationUpdated')
  })

  const getSimulationSocialSecurityRelations = () => {
    const query = `

      {

        simulation ( 
          where: [
            { column: "id", value: "${route.params.simulationId}" }
          ]
        ) {
          id
          retirementDate
          socialSecurityRelations {
            id
            seqNumber
            nit
            relationDocument
            relationOrigin
            relationType
            startAt
            endAt
            lastPaymentAt
            indicators
            contributionTime
            contributions (
              order: [
                { column: "key" }
              ]
            ) {
              key
              id
              monthReference
              baseValue
              valueAfterCheckLimit
              valueAfterCorrection
              finalValue
              isIgnored
              ignoredReason
              groupedContributionsQuantity
              history
            }
          }
          
        }
      }
    
    `

    const init = new Date().getTime()

    GraphQL({ query, delay: 1000 }).then(({ data }) => {
      socialSecurityRelations.value = data.simulation.socialSecurityRelations
      orderSocialSecurityRelations()
    })

    const orderSocialSecurityRelations = () => {
      socialSecurityRelations.value.sort((a, b) => {
        return a.seqNumber - b.seqNumber
      })
      for(const socialSecurityRelation of socialSecurityRelations.value) {
        socialSecurityRelation.contributions.sort((a, b) => {
          return Dates.parse(a.monthReference) - Dates.parse(b.monthReference)
        })
      }
    }

  }

</script>