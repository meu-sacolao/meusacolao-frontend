<template>
  <NuxtLayout name="main-app">
    <div class="w-full flex flex-col space-y-8">
      <AppUploadInput 
        placeholder="Clique ou arraste aqui um arquivo CNIS (.pdf)"
        v-model="file" 
        accept="application/pdf" 
        @change="upload" 
      />

      <CnisUserCard :cnisParsedData="cnisParsedData"></CnisUserCard>

      <CnisSocialSecurityRelationCard
        v-for="socialSecurityRelation of cnisParsedData.socialSecurityRelations"
        :key="socialSecurityRelation.seqNumber"
        :socialSecurityRelation="socialSecurityRelation"
      >
      </CnisSocialSecurityRelationCard>

      <DebugCnisDebug :_debugItems="cnisParsedData._debugItems"></DebugCnisDebug>

    </div>
  </NuxtLayout>
</template>

<script>
import Api from '@/util/Api'
import CnisParsedData from '@/entitties/CnisParsedData'
import contributionTimeBeforeReform from './CNIS Anneliese.pdf_contributionTimeBeforeReform.json'
export default {
  name: 'PageCnis',
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
    // Api.post('/auth/login', {
    //   "email": "igortrindademe@gmail.com",
    //   "password": "123123"
    // })

    this.cnisParsedData =  new CnisParsedData(contributionTimeBeforeReform.cnisParsedData)
  },
  methods: {
    upload() {
      const fd = new FormData()
      fd.append('cnisFile', this.file)
      fd.append('cnisFileName', this.file.name)
      Api.post(`/cnis/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(({ data }) => {
          this.cnisParsedData = new CnisParsedData(data.calcRetirement.cnisParsedData)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
