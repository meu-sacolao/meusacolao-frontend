<template>
  <AppBaseModal :show="showModal" @close="close">

    <div class="flex flex-col space-y-6" v-if="!loggedUser">

      <h3 class="h3 border-l-10 border-orange-500 pl-6 leading-normal mb-4">
        <span>Nova simulação</span>
      </h3>

      <h5 class="h5">Entre ou cadastre-se para gerar sua simulação</h5>
      <AuthForm />
    </div>

    <template v-else>
      <div class="w-full flex flex-col space-y-4" v-if="client">

        <h3 class="h3 border-l-10 border-orange-500 pl-6 leading-normal mb-4">
          <span v-if="client.id">Atualizar dados da simulação</span>
          <span v-else>Adicionar nova simulação</span>
        </h3>

        <AppInputWithIcon 
          v-model:value="retirementDate" 
          icon="today"
          label="Data do cálculo"
          :mask="'##/##/####'"
          type="tel"
          placeholder="Insira a data do cálculo"
          :hasError="tried && formErrors.includes('retirementDate')"
        >
          Preencha a data do cálculo corretamente
        </AppInputWithIcon>

        <AppInputWithIcon 
          v-model:value="client.name" 
          icon="badge"
          label="Nome" 
          placeholder="Insira o nome do segurado(a)" 
          :hasError="tried && client.validateInput('name')"
        >
          Preencha o nome do segurado
        </AppInputWithIcon>

        <AppInputWithIcon 
          v-model:value="client.cpf" 
          icon="fact_check"
          label="CPF" 
          :mask="['###.###.###-##']"
          type="tel"
          placeholder="Insira o cpf" 
          :hasError="tried && client.validateInput('cpf')"
        >
          Preencha o cpf válido do segurado
        </AppInputWithIcon>

        <AppInputWithIcon 
          v-model:value="client.birthDate" 
          icon="today"
          label="Data de nascimento"
          :mask="'##/##/####'"
          type="tel"
          placeholder="Insira a data de nascimento" 
          :hasError="tried && client.validateInput('birthDate')"
        >
          Preencha a data de nascimento válida DD/MM/AAAA
        </AppInputWithIcon>

        <AppInputWithIcon 
          v-model:value="client.phone" 
          icon="today"
          label="Telefone"
          :mask="['(##)#####-####']"
          type="tel"
          placeholder="Insira o telefone" 
          :hasError="tried && client.validateInput('phone')"
        >
          Preencha o telefone
        </AppInputWithIcon>

        <AppInputWithIcon 
          v-model:value="client.email" 
          icon="email"
          label="Email"
          type="email"
          placeholder="Insira o email" 
          :hasError="tried && client.validateInput('email')"
        >
          Preencha o email
        </AppInputWithIcon>

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
          placeholder="Selecione o gênero"
          :keyLabel="'label'"
          :keyValue="'value'"
          :hasError="tried && client.validateInput('gender')"
        >
          Preencha o gênero do segurado {{ client.validateInput('gender') }} {{client.gender }}
        </AppSelectInput>

        <div class="w-full flex justify-end mt-10 block">
          <AppButton bg="bg-brand-gradient" text="text-white" @click="updateOrCreate()" :disabled="Boolean(tried && formErrors.length)">
            <span>Atualizar</span>
            <AppIcons icon="chevron_right" />
          </AppButton>
        </div>
        
      </div>
    </template>
  </AppBaseModal>

</template>

<script setup>
  import AuthForm from '@/modules/auth/AuthForm'
  import GraphQL from '@/util/GraphQL'
  import Client from '@/entities/Client'
  import Api from '@/util/Api'
  import emitter from '@/util/emitter'
  import { useAppSimulationStore } from '@/modules/app/simulation/store'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from "@/modules/auth/store"
  import Dates from '@/services/Dates'
  const vueInstance = useVueInstance()
  const authStore = useAuthStore()
  const { loggedUser } = storeToRefs(authStore)

  const appSimulationStore = useAppSimulationStore()

  const router = useRouter()
  const route = useRoute()
  
  defineEmits(['close'])
  
  const props = defineProps({
    simulation: {
      type: [Object, Boolean],
      default: false
    }
  })

  onMounted(() => {
    emitter.on('openClientEditModal', ({ client: clientToSet } = {}) => {
      showModal.value = true
      client.value = new Client(clientToSet ?? {})
      if(props.simulation) {
        retirementDate.value = props.simulation.retirementDate
        simulationId.value = props.simulation.id
      }
    })
  })

  onBeforeUnmount(() => {
    emitter.off('openClientEditModal')
  })

  const showModal = ref(false)
  const client = ref(new Client())
  const retirementDate = ref('')
  const simulationId = ref(null)
  const tried = ref(false)
  const isLoading = ref(false)

  const formErrors = computed(() => {
    const errors = []
    if(retirementDate.value.length < 10 || !Dates.isValid(retirementDate.value)) errors.push('retirementDate')
    return [ ...errors, client.value.errors.map((required) => required.item )]
  })

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
        client.value = new Client(data.clients[0])
        isLoading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateOrCreate = () => {

    if(formErrors.value.length) {
      tried.value = true
      return
    }
    
    const payload = { 
      client: { ...client.value },
      simulationId: simulationId.value,
      retirementDate: retirementDate.value
    }

    Api.post(`/app/client/updateOrCreate`, payload).then(({ data }) => {

      emitter.emit('simulationUpdated')
      isLoading.value = true
      close()

      if(!payload.simulationId) {
        vueInstance.config.globalProperties.$gtag.event('CRIAR_SIMULAÇÃO_MANUAL', { event_category: 'INTERAÇÕES', value: data.simulation.id })
        router.push(`/simulacao/${data.simulation.id}`)
        appSimulationStore.addSimulationToAttach(data.simulation.id)
      }
    })
    .catch((err) => {
      console.log(err)
    })

  }


</script>
