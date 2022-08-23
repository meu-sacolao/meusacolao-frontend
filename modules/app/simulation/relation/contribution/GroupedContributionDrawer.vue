<template>
  

  <AppBaseDrawer :showDrawer="showDrawer" @open="getContributions" @close="close">
    <div class="w-full flex flex-col space-y-4">
      <AppTitle>Contribuições</AppTitle>
      <p>Lista de contribuições no mesmo período: <b>{{ monthReference }}</b></p>
      
      <div class="overflow-x-auto">
        <table class="table-auto w-full whitespace-nowrap">
          <thead>
            <tr>
              <th>Vínculo</th>
              <th>Valor base</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(contribution, index) in contributions"
              :key="`contribution_${ index }`"
              :class="[contribution.isIgnored ? 'bg-orange-200/40' : 'bg-gray-50 hover:bg-gray-100']" 
            >
              <td>
                <span class="text-zinc-400 mr-2">#{{ contribution.socialSecurityRelation.seqNumber }}</span>
                <span>{{ contribution.socialSecurityRelation.relationOrigin }}</span>
              </td>
              <td>
                {{ vueNumberFormat(contribution.baseValue, getCurrencyFormatter(contribution.monthReference)) }}
              </td>
              <td>
                <div class="flex " >
                  <AppButton 
                    title="Editar contribuição"
                    @click="openContributionModal(contribution.id)"
                    class="text-zinc-400 hover:text-orange-600"
                  >
                    <AppIcons icon="edit" />
                  </AppButton>
                  <AppButton 
                    :title="!contribution.isIgnored ? `Ignorar contribuição` : `Remover ignorado da contribuição`"
                    class="text-zinc-400 hover:text-orange-600"
                    @click="ignoreContribution(contribution)"
                  >
                    <AppIcons v-if="!contribution.isIgnored" icon="do_not_disturb_on" />
                    <AppIcons v-else icon="add_circle" />
                  </AppButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </AppBaseDrawer>
</template>

<script setup>

  import GraphQL from '@/util/GraphQL'
  import Api from '@/util/Api'
  const route = useRoute()
  const { emit } = getCurrentInstance()
  import Dates from '@/services/Dates'
  import emitter from '@/util/emitter'
  import getCurrencyType from '@/util/functions/getCurrencyType'

  onMounted(() => {
    emitter.on('openGroupedContributionDrawer', ({ monthReference: monthToSearch }) => {
      monthReference.value = monthToSearch
      showDrawer.value = true
      getContributions()
    })

    emitter.on('simulationUpdated', getContributions)
  })

  onBeforeUnmount(() => {
    emitter.off('openGroupedContributionDrawer')
    emitter.off('simulationUpdated', getContributions)
  })

  const showDrawer = ref(false)
  const monthReference = ref(null)
  const isProcessing = ref(false)

  const contributions = ref([])

  const getContributions = () => {
    if(!showDrawer.value) return
    const query = `
      {
        contributions (
          where: [
            { column: "simulationId", value: "${route.params.simulationId}" }
            { column: "monthReference", value: "${Dates.format(monthReference.value, 'yyyy-MM-dd')}" }
          ]
        ) {
          id
          monthReference
          baseValue
          isIgnored
          socialSecurityRelation {
            id
            seqNumber
            relationOrigin
          }
        }
      }
    `

    GraphQL({ query, caller: 'GroupedContributionDrawer.getConntributions' })
      .then(({ data }) => {
        contributions.value = data.contributions.sort((a, b) => {
          return a.socialSecurityRelation.seqNumber - b.socialSecurityRelation.seqNumber
        })
      })
  }

  const openContributionModal = (contributionId) => {
    emitter.emit('openModalEditContribution', { id: contributionId })
  }

  const getCurrencyFormatter = (monthReference) => {
    return getCurrencyType(monthReference).vueNumberFormatOptions
  }

  const close = () => {
    showDrawer.value = false
  }

  const ignoreContribution = (contribution) => {
    if(isProcessing.value) return
    isProcessing.value = true
    const payload = { 
      id: contribution.id,
      isIgnored: !contribution.isIgnored
    }
    
    Api.post(`/app/contribution/updateOrCreate`, payload).then((response) => {
      Api.get(`/app/simulation/reprocess/${route.params.simulationId}`)
      isProcessing.value = false
    })
    .catch((err) => {
      console.log(err)
    })

  }


</script>