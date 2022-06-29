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
  </div>
</template>

<script>
import Api from '@/util/Api'
export default {
  name: 'ProcessCnisFile',
  data() {
    return {
      retirementDate: '19/04/2015',
      file: {
        type: '',
        name: ''
      }
    }
  },
  methods: {
    upload() {
      this.isProcessed = false
      const fd = new FormData()
      fd.append('cnisFile', this.file)
      fd.append('cnisFileName', this.file.name)
      fd.append('retirementDate', this.retirementDate)
      Api.post(`/cnis/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(({ data }) => {
          this.$router.push(`/simulacao/${data.simulation.id}`)
        })
        .catch((error) => {
          alert('Erro ao processar CNIS')
          console.log(error)
        })
    }
  }
}
</script>
