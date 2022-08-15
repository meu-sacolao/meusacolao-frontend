<template>

  <div class="w-full p-6 flex flex-col space-y-6">

    <AppLoaderPlaceholder v-if="!socialSecurityRelations" />

    <RelationCard
      v-for="(socialSecurityRelation, index) in socialSecurityRelations"
      :key="`simulation-social-security-${index}`"
      :socialSecurityRelation="socialSecurityRelation"
    ></RelationCard>

    <ContributionEditModal />
    <MultipleContributionEditModal />

    <GroupedContributionDrawer></GroupedContributionDrawer>
    
  </div>

</template>

<script setup>

  import RelationCard from '@/modules/app/simulation/relation/RelationCard'
  import ContributionEditModal from '@/modules/app/simulation/relation/contribution/ContributionEditModal'
  import MultipleContributionEditModal from '@/modules/app/simulation/relation/contribution/MultipleContributionEditModal'
  import GroupedContributionDrawer from '@/modules/app/simulation/relation/contribution/GroupedContributionDrawer'
  import GraphQL from "@/util/GraphQL"
  import emitter from '@/util/emitter'
  import Dates from '@/services/Dates'
  import { ArrayHelpers } from '@igortrindade/lazyfy'

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
    emitter.on('contributionUpdated', updateContribution)
  })

  onBeforeUnmount(() => {
    emitter.off('simulationUpdated')
    emitter.off('contributionUpdated')
  })

  const updateContribution = ({ contribution }) => {

    const socialSecurityRelation = ArrayHelpers.find(socialSecurityRelations.value, { id: contribution.socialSecurityRelationId })
    const finded = ArrayHelpers.find(socialSecurityRelation.contributions, { id: contribution.id })
    if(finded) {
      Object.keys(contribution).map((key) => {
        finded[key] = contribution[key]
      })
    } else {
      socialSecurityRelation.contributions.push(contribution)
      orderSocialSecurityRelations()
    }
  }

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

  }

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

</script>