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
              :class="[contribution.isIgnored ? 'bg-gray-200/50' : 'bg-gray-50 hover:bg-gray-100']"  
            >
              <td :class="{'line-through' : contribution.isIgnored }">
                {{ contribution.socialSecurityRelation.relationOrigin }}
              </td>
              <td :class="{'line-through' : contribution.isIgnored }">
                {{ vueNumberFormat(contribution.baseValue, getCurrencyFormatter(contribution.monthReference)) }}
              </td>
              <td>
                <div class="flex " >
                  <AppButton 
                    @click="openContributionModal(contribution.id)"
                    class="text-zinc-400 hover:text-orange-600"
                  >
                    <AppIcons icon="edit" />
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

  import Api from '@/util/Api'
  import GraphQL from '@/util/GraphQL'
  const route = useRoute()
  const { emit } = getCurrentInstance()
  import Dates from '@/services/Dates'
  import emitter from '@/util/emitter'
  import getCurrencyType from '@/util/functions/getCurrencyType'

  const props = defineProps({
    monthReference: {
      type: String,
      default: null
    }
  })

  defineEmits(['close'])

  const showDrawer = computed(() => {
    return props.monthReference ? true : false
  })

  const contributions = ref([])


  const getContributions = () => {
    const query = `
      {
        contributions (
          where: [
            { column: "simulationId", value: "${route.params.simulationId}" }
            { column: "monthReference", value: "${Dates.format(props.monthReference, 'yyyy-MM-dd')}" }
          ]
        ) {
          id
          monthReference
          baseValue
          isIgnored
          socialSecurityRelation {
            id
            relationOrigin
          }
        }
      }
    `

    GraphQL({ query, caller: 'GroupedContributionDrawer.getConntributions' })
      .then(({ data }) => {
        contributions.value = data.contributions
      })
  }

  const openContributionModal = (contributionId) => {
    emitter.emit('openModalEditContribution', contributionId)
  }

  const getCurrencyFormatter = (monthReference) => {
    return getCurrencyType(monthReference).vueNumberFormatOptions
  }

  const close = () => {
    emit('close')
  }


</script>