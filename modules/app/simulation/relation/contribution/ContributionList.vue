<template>

  <div class="overflow-x-auto">
    <table class="table-auto w-full whitespace-nowrap">
      <thead>
        <tr>
          <th>Competência</th>
          <th>Valor base</th>
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
          <td :class="{'line-through' : contribution.isIgnored }">{{ contribution.monthReference }}</td>
          <td :class="{'line-through' : contribution.isIgnored }">{{ vueNumberFormat(contribution.baseValue, getCurrencyFormatter(contribution.monthReference)) }}</td>
          <td>
            <AppMoneyInput 
              class="w-40" 
              v-model:value="contribution.baseValue"
              :dateReference="contribution.monthReference"
            />
          </td>
          <td>
            <div class="flex " >
              <AppButton 
                @click="openContributionModal(contribution.id)"
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
  </div>
</template>

<script setup>

  import Api from '@/util/Api'
  import emitter from '@/util/emitter'
  import getCurrencyType from '@/util/functions/getCurrencyType'
  
  const route = useRoute()

  defineProps({
    contributions: Array
  })

  const openContributionModal = (contributionId) => {
    emitter.emit('openModalEditContribution', contributionId)
  }

  const getCurrencyFormatter = (monthReference) => {
    return getCurrencyType(monthReference).vueNumberFormatOptions
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

<style lang="scss">
  table {
    
    th {
      @apply p-3 bg-gray-100  text-left border-b;
    }

    td {
      @apply p-3  ;
    }
  }
</style>