<template>

  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap justify-between items-center">
      <div class="flex items-center cursor-pointer" @click.stop="toggleCard()"> 
        <span 
          class="mr-1 -ml-1 material-icons material-symbols-sharp text-slate-400 flex-none transition-all transform  text-2xl"
          :class="showContent ? 'rotate-90' : 'closed rotate-0'"
        >
          chevron_right
        </span>
        <div class="w-full flex flex-col">
          <h3 class="h3 flex-none text-slate-400">Contribuições</h3>
          <p class="text-xs italic">{{ socialSecurityRelation.contributions.length }} contribuições</p>
        </div>
      </div>
      <AppButton 
        bg="bg-brand-gradient text-white"
        @click="openContributionModal({ socialSecurityRelation })"
      >
        <AppIcons icon="add" />
        Adicionar contribuição
      </AppButton>
    </div>

    <div class="overflow-x-auto mt-4" v-if="showContent">
      <table class="table-auto w-full whitespace-nowrap">
        <thead>
          <tr>
            <th>Competência</th>
            <th>Valor base</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(contribution, index) in socialSecurityRelation.contributions"
            :key="`contribution_${ index }`"
            :class="[contribution.isIgnored ? 'bg-gray-200/50' : 'bg-gray-50 hover:bg-gray-100']"  
          >
            <td :class="{'line-through' : contribution.isIgnored }">
              <div class="flex items-center">
                <span>{{ contribution.monthReference }}</span>
                <button 
                  v-if="contribution.groupedContributionsQuantity > 1" 
                  class="text-orange-500 -mb-1 ml-2"
                  @click="openContributionMonthReferenceDrawer(contribution.monthReference)"
                >
                  <AppIcons icon="add_circle" />
                </button>
              </div>
            </td>
            <td :class="{'line-through' : contribution.isIgnored }">{{ vueNumberFormat(contribution.baseValue, getCurrencyFormatter(contribution.monthReference)) }}</td>
            <td>
              <div class="flex " >
                <AppButton 
                  @click="openContributionModal({ id: contribution.id })"
                  class="text-zinc-400 hover:text-orange-600"
                >
                  <AppIcons icon="edit" />
                </AppButton>  
                <AppButton 
                  class="text-zinc-400 hover:text-orange-600"
                  @click="ignoreContribution(contribution)"
                >
                  <AppIcons icon="do_not_disturb_on" />
                </AppButton>  
                <AppButton 
                  class="text-zinc-400 hover:text-orange-600"
                  @click="destroy(contribution)"  
                >
                  <AppIcons icon="delete_forever" />
                </AppButton>  
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <GroupedContributionDrawer 
        :monthReference="contributionMonthReference"
        @close="contributionMonthReference = null"
      />
    </div>
  </div>

</template>

<script setup>

  import GroupedContributionDrawer from '@/modules/app/simulation/relation/contribution/GroupedContributionDrawer'
  import Api from '@/util/Api'
  import emitter from '@/util/emitter'
  import getCurrencyType from '@/util/functions/getCurrencyType'
  import Dates from '@/services/Dates'
  
  const route = useRoute()

  const contributionMonthReference = ref(null)
  const showContent = ref(false)

  defineProps({
    socialSecurityRelation: Object
  })

  const openContributionModal = ({ id = null, socialSecurityRelation = null }) => {
    let socialSecurityRelationId, monthReference
    const simulationId = route.params.simulationId
    if(socialSecurityRelation) {
      socialSecurityRelationId = socialSecurityRelation.id
      if(socialSecurityRelation.endAt) monthReference = Dates.format(socialSecurityRelation.endAt, 'MM/yyyy')
    }
    emitter.emit('openModalEditContribution', { id, simulationId, socialSecurityRelationId, monthReference })
  }

  const getCurrencyFormatter = (monthReference) => {
    return getCurrencyType(monthReference).vueNumberFormatOptions
  }

  const openContributionMonthReferenceDrawer = (monthReference) => {
    contributionMonthReference.value = monthReference
  }

  const toggleCard = () => {
    showContent.value = !showContent.value
  }

  const ignoreContribution = (contribution) => {

    const payload = { 
      entity: 'Contribution', 
      id: contribution.id,
      isIgnored: !contribution.isIgnored
    }
    
    Api.post(`/app/general/updateOrCreate`, payload).then((response) => {
      Api.get(`/simulation/reprocess/${route.params.simulationId}`)
      .then(() => {
        emitter.emit('simulationUpdated')
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }

  const destroy = (contribution) => {

    const payload = { 
      entity: 'Contribution', 
      id: contribution.id
    }
    
    Api.post(`/app/general/destroy`, payload).then((response) => {
      Api.get(`/simulation/reprocess/${route.params.simulationId}`)
      .then(() => {
        emitter.emit('simulationUpdated')
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }

</script>