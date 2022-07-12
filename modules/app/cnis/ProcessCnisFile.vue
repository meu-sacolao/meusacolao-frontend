<template>
  <div class="w-full flex flex-col space-y-8">
    <AppCard>
      <template v-slot:header>
        <div class="w-full flex space-x-2 pr-12">
        <h3 class="h3 truncate leading-relaxed ...">Calcule sua aposentadoria</h3>
      </div>
      </template>
      <template v-slot:content>
        <div class="flex flex-col space-y-6">
          
          <p class="text-lg">
            Insira seu extrato do INSS (arquivo CNIS) para calcular sua aposentadoria gratuitamente.
          </p>
          <AppInputWithIcon v-model:value="retirementDate" :mask="'##/##/####'" label="Data do cálculo" icon="calendar_month" placeholder="DD/MM/AAAA" />
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
    <ProcessCnisLoaderModal :showModal="showModal" @close="closeModal" />
  </div>

</template>

<script setup>
  
  import Api from '@/util/Api'
  import ProcessCnisLoaderModal from '@/modules/app/cnis/ProcessCnisLoaderModal.vue'
  const router = useRouter()

  const retirementDate = ref('19/04/2015')
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

</script>
