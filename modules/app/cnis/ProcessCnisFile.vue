<template>
  <div class="w-full flex flex-col space-y-8">
    <AppCard>
      <template v-slot:header>
        <div class="w-full flex space-x-2 pr-12">
        <h3 class="h3 truncate leading-relaxed ...">Simule sua aposentadoria</h3>
      </div>
      </template>
      <template v-slot:content>
        <div class="flex flex-col space-y-4">
          
          <p class="text-lg">
            Insira seu extrato do INSS (arquivo CNIS) para simular sua aposentadoria gratuitamente.
          </p>
          <AppInputWithIcon v-model:value="retirementDate" :mask="'##/##/####'" label="Data do cálculo" icon="calendar_month" placeholder="DD/MM/AAAA" />
          <AppUploadInput 
            placeholder="Clique ou arraste aqui um arquivo CNIS (.pdf)"
            v-model="file" 
            accept="application/pdf"
            label="Arquivo CNIS"
          />

        </div>
        <div class="w-full flex justify-end mt-10 block">
          <AppButton bg="bg-brand-gradient" text="text-white" @click="upload">
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
  const file = ref({
    type: '',
    name: ''
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
