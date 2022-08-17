<template>
  <AppBaseModal :show="showModal" @close="close">
    <div class="w-full flex flex-col space-y-4" v-if="socialSecurityRelation">

      <AppInputWithIcon 
        v-model:value="socialSecurityRelation.relationOrigin" 
        icon="badge"
        label="Nome" 
        placeholder="Insira o nome do vínculo" 
      />

      <AppInputWithIcon 
        v-model:value="socialSecurityRelation.relationDocument" 
        icon="fact_check"
        label="Documento" 
        :mask="['###.###.###-##', '##.###.###/####-##']"
        placeholder="Insira o nome do vínculo" 
      />

      <AppInputWithIcon 
        v-model:value="socialSecurityRelation.startAt" 
        icon="today"
        label="Início"
        :mask="'##/##/####'"
        placeholder="Insira o início do vínculo" 
      />

      <AppInputWithIcon 
        v-model:value="socialSecurityRelation.endAt" 
        icon="today"
        label="Término"
        :mask="'##/##/####'"
        placeholder="Insira o término do vínculo" 
      />

      <AppMoneyInput
        v-model:value="socialSecurityRelation.specialTime" 
        icon="timer"
        label="Período especial" 
        placeholder="1,00"
        :inputOptions="{ decimals: ',', prefix: '', precision: 2 }"
      />

      <AppCheckBox
        v-model:value="socialSecurityRelation.isIgnored"
      >
        Ignorar vínculo
      </AppCheckBox>

      <AppInputWithIcon 
        v-model:value="socialSecurityRelation.ignoredReason" 
        icon="badge"
        label="Motivo" 
        placeholder="Insira um motivo de ignorar (opcional)"
        v-if="socialSecurityRelation.isIgnored"
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
  
  defineEmits(['close'])

  onMounted(() => {
    emitter.on('openRelationEditModal', ({ socialSecurityRelation: socialSecurityRelationToSet }) => {
      showModal.value = true
      socialSecurityRelation.value = socialSecurityRelationToSet
    })
  })

  onBeforeUnmount(() => {
    emitter.off('openRelationEditModal')
  })

  const showModal = ref(false)
  const socialSecurityRelation = ref(false)

  const isLoading = ref(false)

  const close = () => {
    showModal.value = false
  }

  const get = () => {
    isLoading.value = true

    const query = `
      {
        socialSecurityRelations (
          where: [
            { column: "id", value: "${props.socialSecurityRelationId}"}
          ]
        ) {
          id
          nit
          relationDocument
          relationOrigin
          relationType
          startAt
          endAt
          lastPaymentAt
          isIgnored
          ignoredReason
          specialTime
        }
      }
    `
    GraphQL({ query, caller: 'RelationEditModal' })
      .then(({ data }) => {
        socialSecurityRelation.value = data.socialSecurityRelations[0]
        isLoading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const update = () => {
    
    Api.post(`/app/socialSecurityRelation/updateOrCreate`, socialSecurityRelation.value).then(({ data }) => {
      isLoading.value = true
      close()
      emitter.emit('socialSecurityRelationUpdated', { socialSecurityRelation: data.socialSecurityRelation })
    })
    .catch((err) => {
      console.log(err)
    })

  }


</script>
