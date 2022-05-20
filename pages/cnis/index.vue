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

      <AppCard v-for="(debugItem, index) in itemsToDebug" :key="`debug_${debugItem}`">
        <template v-slot:header>
          <div class="w-full flex items-center">
            <span 
              class="mr-3 material-icons-round flex-none transition-all transform cursor-pointer text-4xl"
              :class="hideItemsToDebug.indexOf(index) > -1 ? 'rotate-90' : 'closed rotate-0'"
              @click="toggleCard(index)"
            >
              chevron_right
            </span>
            <div class="w-full flex flex-col">
              <div class="w-full flex space-x-2 pr-12">
                <h3 class="h3 flex-none text-slate-400">#{{ debugItem }}</h3>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:content v-if="hideItemsToDebug.indexOf(index) > -1">
          <CnisContributionList
          :contributions="cnisParsedData[debugItem]"
        ></CnisContributionList>
        </template>
      </AppCard>
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
      cnisParsedData: new CnisParsedData(),
      itemsToDebug: ['allContributions', 'contributionsWithinTimeframe', 'contributionsOutOfTimeFrame', 'contributionsLessThan80Percent'],
      hideItemsToDebug: []
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
    },

    toggleCard(index) {
      if(this.hideItemsToDebug.indexOf(index) > -1) {
        this.hideItemsToDebug.splice(index, 1)
      } else {
        this.hideItemsToDebug.push(index)
      }
    }
  }
}
</script>
