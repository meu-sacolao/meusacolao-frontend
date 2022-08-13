<template>
  <tbody :class="[contribution.isIgnored ? 'bg-gray-200/50' : 'bg-gray-50 hover:bg-gray-100']">
  <tr>
    <td :class="{'line-through' : contribution.isIgnored }">
      <div class="flex items-center">
        <span 
          v-if="contribution.history.length"
          @click="toggleCard()"
          class="mr-1 -ml-1 material-icons material-symbols-sharp text-slate-400 flex-none transition-all transform text-2xl cursor-pointer"
          :class="showContent ? 'rotate-90' : 'closed rotate-0'"
        >
          chevron_right
        </span>
        <span>{{ contribution.monthReference }} - {{ contribution.key }}</span>
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
  <tr>
    <td class="pl-3 border-t" colspan="3" v-if="showContent">
      <div class="pl-3">
        <ul class="w-full list-disc pl-3">
          <li v-for="(history, index) in contribution.history" :key="`${contribution.id}_${index}`" >{{ history }}</li>
        </ul>
      </div>
    </td>
  </tr>
</tbody>
</template>

<script setup>

  import GroupedContributionDrawer from '@/modules/app/simulation/relation/contribution/GroupedContributionDrawer'
  import Api from '@/util/Api'
  import emitter from '@/util/emitter'
  import getCurrencyType from '@/util/functions/getCurrencyType'
  import Dates from '@/services/Dates'

  defineProps({
    contribution: Object
  })
  
  const route = useRoute()

  const contributionMonthReference = ref(null)
  const showContent = ref(false)

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
      id: contribution.id,
      isIgnored: !contribution.isIgnored
    }
    
    Api.post(`/app/contribution/updateOrCreate`, payload).then((response) => {
      Api.get(`/app/simulation/reprocess/${route.params.simulationId}`)
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
      Api.get(`/app/simulation/reprocess/${route.params.simulationId}`)
      .then(() => {
        emitter.emit('simulationUpdated')
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }

</script>