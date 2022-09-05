<template>
  <div class="w-full flex flex-col space-y-8">


    <div class="w-full flex flex-wrap p-8 shadow-md bg-cyan-800/5">

      <div class="w-full lg:w-1/3 flex flex-wrap items-center justify-center">
        <img class="w-full -mt-10 w-1/2 lg:w-3/4" src="/images/general/pack-illustrations/14.svg" />
        <h3 class="h3 text-center">Cálculo e Previdência</h3>
      </div>
      <div class="w-full lg:w-1/3 bg-white p-6 flex flex-col space-y-4 shadow">
        <h3 class="h3">Aposentadoria</h3>
        <p class="leading-relaxed">Verifique de forma simples e rápida se você tem direito a se aposentar e controle seus Registros previdenciários.</p>
      </div>
      <div class="w-full lg:w-1/3 bg-white border-t lg:border-l lg:border-t-0 border-zinc-100 p-6 flex flex-col space-y-4 shadow">
        <h3 class="h3">Programe-se</h3>
        <p class="leading-relaxed">Realize a projeção de quando irá se aposentar e obtenha auxilio dos nossos analistas para definir a melhor estratégia para sua aposentadoria.</p>
      </div>
    </div>
    <AppCard>
      <template v-slot:header>
        <div class="w-full flex flex-col pr-12">
        <h3 class="h3 truncate leading-relaxed ...">Calcular aposentadoria com o CNIS</h3>
        <h5>Utilize o arquivo CNIS fornecido pelo INSS para calcular de forma automática a sua aposentadoria</h5>
      </div>
      </template>
      <template v-slot:content>
        <div class="flex flex-col space-y-6">
          
          <p class="text-lg">
            Insira seu extrato do INSS (arquivo CNIS) para calcular sua aposentadoria gratuitamente.
          </p>
          <AppInputWithIcon 
            v-model:value="retirementDate" 
            type="tel"
            :mask="'##/##/####'" 
            label="Data do cálculo" 
            icon="calendar_month" 
            placeholder="DD/MM/AAAA" 
          />
          <AppUploadInput 
            placeholder="Clique ou arraste aqui um arquivo CNIS (.pdf)"
            v-model="file" 
            accept="application/pdf"
            label="Arquivo CNIS"
          />

          <AppCheckBox
            v-model:value="acceptTerms"
            label="Autorizo que meus dados pessoais e previdenciários sejam utilizados para simulações   de cálculos de benefícios a que faço jus e orientações técnicas dos nossos analistas. "
          >
            Autorizo que meus dados pessoais e previdenciários sejam utilizados para simulações   de cálculos de benefícios a que faço jus e orientações técnicas dos nossos analistas. 
          </AppCheckBox>


        </div>
        <div class="w-full flex justify-end mt-10 block">
          <AppButton 
            bg="bg-brand-gradient" 
            text="text-white" 
            @click="upload"
            :disabled="hasError"
          >
            <span>Continuar</span>
            <AppIcons icon="chevron_right" />
          </AppButton>
        </div>
      </template>
    </AppCard>

    <AppCard>
      <template v-slot:header>
        <div class="w-full flex flex-col pr-12">
        <h3 class="h3 truncate leading-relaxed ...">Calcular aposentadoria manualmente</h3>
        <h5>Informe os dados do segurado para calcular a sua aposentadoria.</h5>
      </div>
      </template>
      <template v-slot:content>
        <div class="flex flex-col items-start space-y-6">
          
          <p class="text-lg">
            Não possui o arquivo CNIS fornecido pelo INSS em mãos? Não tem problema! Simule sua aposentadoria informando os dados manualmente.
          </p>
          <AppButton 
            bg="bg-brand-gradient" 
            text="text-white" 
            @click="openClientEditModal"
          >
            Gerar simulação manualmente
          </AppButton>
        </div>
      </template>
    </AppCard>

    <ProcessCnisLoaderModal :showModal="showModal" @close="closeModal" />

    <ClientEditModal />

  </div>

</template>

<script setup>
  
  import Api from '@/util/Api'
  import ProcessCnisLoaderModal from '@/modules/app/cnis/ProcessCnisLoaderModal.vue'
  import ClientEditModal from '@/modules/app/simulation/ClientEditModal.vue'
  import { useAppSimulationStore } from '@/modules/app/simulation/store'
  import { useAuthStore } from '@/modules/auth/store'
  import emitter from '@/util/emitter'
  const vueInstance = useVueInstance()


  const appSimulationStore = useAppSimulationStore()
  const authStore = useAuthStore()

  const router = useRouter()
  const route = useRoute()

  const retirementDate = ref(process.env.NODE_ENV == 'production' ? '' : '10/10/2020')
  const showModal = ref(false)
  const acceptTerms = ref(false)
  const file = ref({
    type: '',
    name: ''
  })

  const hasError = computed(() => {
    if(!retirementDate.value || !acceptTerms.value || !file.value.name || !file.value.name.includes('.pdf')) return true
    return false
  })

  const upload = () => {
    showModal.value = true
    const fd = new FormData()
    fd.append('cnisFile', file.value)
    fd.append('cnisFileName', file.value.name)
    fd.append('retirementDate', retirementDate.value)
    Api.post(`/cnis/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(({ data }) => {
        router.push(`/simulacao/${data.simulation.id}`)
        appSimulationStore.addSimulationToAttach(data.simulation.id)

        try {
          vueInstance.config.globalProperties.$gtag.event('CRIAR_SIMULAÇÃO_COM_CNIS', { event_category: 'INTERAÇÕES', value: data.simulation.id })
        } catch (err) {
          console.log(err)
        }

      })
      .catch((error) => {
        showModal.value = false
        alert('Erro ao processar CNIS')
        console.log(error)
      })
  }

  const closeModal = () => {
    showModal.value = false
  }
  
  const openClientEditModal = () => {
    emitter.emit('openClientEditModal')
    authStore.setRedirectTo({ route: route.fullPath, event: 'openClientEditModal' })
  }

</script>
