<template>
  <NuxtLayout name="main-app">
    <div class="w-full flex flex-col space-y-8">
      <AppUploadInput 
        label="Adicione um arquivo"
        v-model="file" 
        accept="application/pdf" 
        @change="upload" 
      />
      <SocialSecurityRelationCardShow
        v-for="socialSecurityRelation of contributionTimeBeforeReform.socialSecurityRelations"
        :key="socialSecurityRelation.seqNumber"
        :socialSecurityRelation="socialSecurityRelation"
      >
      </SocialSecurityRelationCardShow>
    </div>
  </NuxtLayout>
</template>

<script>
import Api from '@/util/Api'
import CnisParsedData from '@/entitties/CnisParsedData'
import contributionTimeBeforeReform from './teste.json'
export default {
  name: 'upload-input',
  data() {
    return {
      file: {
        type: '',
        name: ''
      },
      cnisParsedData: new CnisParsedData(),
      contributionTimeBeforeReform: contributionTimeBeforeReform.cnisParsedData
    }
  },
  mounted() {
    // Api.post('/auth/login', {
    //   "email": "igortrindademe@gmail.com",
    //   "password": "123123"
    // })

    console.log(contributionTimeBeforeReform)
  },
  methods: {
    upload() {
      const fd = new FormData()
      fd.append('cnisFile', this.file)
      fd.append('cnisFileName', this.file.name)
      Api.post(`/cnis/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(({ data }) => {
          this.cnisParsedData = new CnisParsedData(data.cnis.parsedData)
          this.contributionTimeBeforeReform = new CnisParsedData(data.contributionTimeBeforeReform.cnisParsedData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>
