<template>
  <div class="w-full flex flex-col space-y-8">
    
    <AppCard>
      <template v-slot:content>
        <div class="flex flex-col space-y-3">
          <AppInputWithIcon v-model:value="retirementDate" :mask="'##/##/####'" label="Data do cálculo" icon="calendar_month" placeholder="DD/MM/AAAA" />
          <AppUploadInput 
            placeholder="Clique ou arraste aqui um arquivo CNIS (.pdf)"
            v-model="file" 
            accept="application/pdf"
          />
          <AppButton bg="bg-slate-700" text="text-white" @click="upload">Processar CNIS</AppButton>
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
          console.log(error)
        })
    }
  }
}
</script>
