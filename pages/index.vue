<template>
  
  <NuxtLayout name="main-app">
    
    
    <div class="w-full flex flex-col">
      <upload-input 
        label="Adicione um arquivo"
        v-model="file" 
        accept="application/pdf" 
        @change="upload" 
      />
      
      <pre>{{ cnisParsedData }}</pre>

    </div>
  </NuxtLayout>
</template>

<script>
import Api from '@/util/Api'
import CnisParsedData from '@/entitties/CnisParsedData'
export default {
  name: 'upload-input',
  data() {
    return {
      file: {
        type: '',
        name: ''
      },
      cnisParsedData: new CnisParsedData()
    }
  },
  mounted() {
    Api.post('/auth/login', {
      "email": "igortrindademe@gmail.com",
      "password": "123123"
    })
  },
  methods: {
    upload() {
      const fd = new FormData()
      fd.append('cnisFile', this.file)
      fd.append('cnisFileName', this.file.name)
      Api.post(`/cnis/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(({ data }) => {
          this.cnisParsedData = new CnisParsedData(data.cnis.parsedData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>
