<template>
  <AppBaseModal :show="showModal" @open="get" @close="close">
    <div class="w-full flex flex-col space-y-4">

      <AppInputWithIcon 
        v-model:value="socialSecurityRelation.relationOrigin" 
        icon="badge"
        label="Nome" 
        placeholder="Insira o nome do vínculo" 
      />

      <AppInputWithIcon 
        v-model:value="socialSecurityRelation.relationDocument" 
        icon="badge"
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

  const props = defineProps({
    showModal: Boolean,
    socialSecurityRelationId: String,
  })

  const socialSecurityRelation = ref(false)
  const isLoading = ref(false)

  const close = () => {
    emit('close')
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

    const payload = { 
      entity: 'SocialSecurityRelation', 
      ...socialSecurityRelation.value
    }
    
    Api.post(`/app/general/updateOrCreate`, payload).then((response) => {
      isLoading.value = true
      close()
      Api.get(`/app/simulation/reprocess/${route.params.simulationId}`)
      .then(() => {
        emitter.emit('simulationUpdated')
        isLoading.value = false
        alert('Vínculo atualizado com sucesso')
      })
    })
    .catch((err) => {
      console.log(err)
    })

  }


</script>
