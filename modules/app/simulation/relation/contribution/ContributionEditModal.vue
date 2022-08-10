<template>
  <AppBaseModal :show="showModal" @open="get" @close="close">
    <div class="w-full flex flex-col space-y-4">

      <AppInputWithIcon 
        v-model:value="contribution.monthReference" 
        icon="badge"
        label="Competência" 
        placeholder="Competência"
        disabled="true" 
        :mask="'##/####'"
      />

      <AppMoneyInput
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
        <AppButton bg="bg-brand-gradient space-x-2" text="text-white" @click="update()">
          <AppIcons icon="save" />
          <span v-if="contribution.id">Atualizar</span>
          <span v-else>Adicionar</span>
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
  import Contribution from '@/entities/Contribution'

  onMounted(() => {
    emitter.on('openModalEditContribution', ({ id = null, socialSecurityRelationId = null, simulationId = null, monthReference = null }) => {
      console.log(id, socialSecurityRelationId, simulationId, monthReference)
      contribution.value = new Contribution({ id, socialSecurityRelationId, simulationId, monthReference })
      showModal.value = true
      get()
    })
  })

  onBeforeUnmount(() => {
    emitter.off('openModalEditContribution')
  })

  const contribution = ref(new Contribution())
  const isLoading = ref(false)
  const showModal = ref(false)

  const close = () => {
    showModal.value = false
  }

  const get = () => {
    if(!contribution.value.id) return
    isLoading.value = true

    const query = `
      {
        contributions (
          where: [
            { column: "id", value: "${contribution.value.id}"}
          ]
        ) {
          id
          simulationId
          socialSecurityRelationId
          monthReference
          baseValue
          isIgnored
          ignoredReason
        }
      }
    `
    GraphQL({ query, caller: 'RelationEditModal' })
      .then(({ data }) => {
        contribution.value = new Contribution(data.contributions[0])
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
