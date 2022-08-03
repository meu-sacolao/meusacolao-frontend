<template>
  <AppBaseModal :show="showModal" @open="get" @close="close">
    <div class="w-full flex flex-col space-y-4">

      <AppInputWithIcon 
        v-model:value="contribution.monthReference" 
        icon="badge"
        label="Competência" 
        placeholder="Competência"
        disabled="true" 
      />

      <AppMoneyInput 
        v-if="contribution.baseValue"
        v-model:value="contribution.baseValue" 
        icon="badge"
        label="Valor base" 
        placeholder="Valor"
        :dateReference="contribution.monthReference"
      />

      <AppCheckBox
        v-model:value="contribution.isIgnored"
      >
        Ignorar contribuição
      </AppCheckBox>

      <AppInputWithIcon 
        v-model:value="contribution.ignoredReason" 
        icon="badge"
        label="Motivo" 
        placeholder="Insira um motivo de ignorar (opcional)"
        v-if="contribution.isIgnored"
      />

      <div class="w-full flex justify-end mt-10 block">
        <AppButton bg="bg-brand-gradient" text="text-white" @click="update()">
          <span>Atualizar</span>
          <AppIcons icon="chevron_right" />
        </AppButton>
      </div>
    </div>
  </AppBaseModal>

</template>

<script setup>
  import { getCurrentInstance } from 'vue'
  import GraphQL from '@/util/GraphQL'
  import Api from '@/util/Api'
  import emitter from '@/util/emitter'
  const { emit } = getCurrentInstance()
  const route = useRoute()

  onMounted(() => {
    emitter.on('openModalEditContribution', (id) => {
      contributionId.value = id
      showModal.value = true
      get()
    })
  })

  onBeforeUnmount(() => {
    emitter.off('openModalEditContribution')
  })

  const contribution = ref(false)
  const isLoading = ref(false)
  const showModal = ref(false)
  const contributionId = ref(false)

  const close = () => {
    showModal.value = false
  }

  const get = () => {
    isLoading.value = true

    const query = `
      {
        contributions (
          where: [
            { column: "id", value: "${contributionId.value}"}
          ]
        ) {
          id
          monthReference
          baseValue
          isIgnored
          ignoredReason
        }
      }
    `
    GraphQL({ query, caller: 'RelationEditModal' })
      .then(({ data }) => {
        contribution.value = data.contributions[0]
        isLoading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const update = () => {

    const payload = { 
      entity: 'Contribution', 
      ...contribution.value
    }
    
    Api.post(`/app/general/updateOrCreate`, payload).then((response) => {
      isLoading.value = true
      close()
      Api.get(`/simulation/reprocess/${route.params.simulationId}`)
      .then(() => {
        emitter.emit('simulationUpdated')
        isLoading.value = false
        alert('Contribuição atualizada com sucesso')
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }


</script>
