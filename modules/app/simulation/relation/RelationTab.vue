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

  const route = useRoute()

  const socialSecurityRelations = ref(false)

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
              id
              monthReference
              baseValue
              valueAfterCheckLimit
              valueAfterCorrection
              finalValue
              isIgnored
              ignoredReason
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
        socialSecurityRelations.value = data.simulation.socialSecurityRelations
        orderSocialSecurityRelations()
      } else {
        setTimeout(() => {
          socialSecurityRelations.value = data.simulation.socialSecurityRelations
          orderSocialSecurityRelations()
        }, (1000 - end))
      }

    })

    const orderSocialSecurityRelations = () => {

      socialSecurityRelations.value.sort((a, b) => {
        return a.seqNumber - b.seqNumber
      })

    }

  }

</script>