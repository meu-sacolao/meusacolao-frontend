<template>
  <AppBaseModal :show="showModal" @close="close">
    <div class="w-full flex flex-col space-y-4" v-if="client">

      <h3 class="h3 border-l-10 border-orange-500 pl-6 leading-normal mb-4">
        <span v-if="client.id">Atualizar</span>
        <span v-else>Adicionar</span>
        <span> dados</span>
      </h3>

      <AppInputWithIcon 
        v-model:value="client.name" 
        icon="badge"
        label="Nome" 
        placeholder="Insira o nome do segurado(a)" 
      />

      <AppInputWithIcon 
        v-model:value="client.cpf" 
        icon="fact_check"
        label="CPF" 
        :mask="['###.###.###-##']"
        type="tel"
        placeholder="Insira o cpf" 
      />

      <AppInputWithIcon 
        v-model:value="client.birthDate" 
        icon="today"
        label="Data de nascimento"
        :mask="'##/##/####'"
        type="tel"
        placeholder="Insira a data de nascimento" 
      />

      <AppInputWithIcon 
        v-model:value="client.phone" 
        icon="today"
        label="Telefone"
        :mask="['(##)#####-####']"
        type="tel"
        placeholder="Insira o telefone" 
      />

      <AppInputWithIcon 
        v-model:value="client.email" 
        icon="email"
        label="Email"
        type="email"
        placeholder="Insira o email" 
      />

      <AppInputWithIcon 
        v-model:value="client.motherName" 
        icon="badge"
        label="Nome da mãe do segurado(a)" 
        placeholder="Insira o nome da mãe do segurado(a)" 
      />

      <AppSelectInput
        v-model:value="client.gender"
        :items="['Feminino', 'Masculino']"
        label="Gênero"
        :keyLabel="'label'"
        :keyValue="'value'"
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
  
  const route = useRoute()
  const { emit } = getCurrentInstance()
  
  defineEmits(['close'])

  onMounted(() => {
    emitter.on('openClientEditModal', ({ client: clientToSet }) => {
      console.log(clientToSet)
      showModal.value = true
      client.value = clientToSet
    })
  })

  onBeforeUnmount(() => {
    emitter.off('openClientEditModal')
  })

  const showModal = ref(false)
  const client = ref(false)

  const isLoading = ref(false)

  const close = () => {
    showModal.value = false
  }

  const get = () => {
    isLoading.value = true

    const query = `
      {
        clients (
          where: [
            { column: "id", value: "${props.clientId}"}
          ]
        ) {
          id
          name
          phone
          birthDate
          motherName
          cpf
          nit
          gender
        }
      }
    `
    GraphQL({ query, caller: 'ClientEditModal' })
      .then(({ data }) => {
        client.value = data.clients[0]
        isLoading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const update = () => {
    
    Api.post(`/app/client/updateOrCreate`, { ...client.value, simulationId: route.params.simulationId }).then(({ data }) => {
      isLoading.value = true
      close()    
      emitter.emit('simulationUpdated')

    })
    .catch((err) => {
      console.log(err)
    })

  }


</script>
