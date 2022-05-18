<template>
  
  <NuxtLayout name="main-app">
    <div class="w-full flex flex-col space-y-4">
      <upload-input 
        label="Adicione um arquivo"
        v-model="file" 
        accept="application/pdf" 
        @change="upload" 
      />
      
      <Card>
        <h1 class="h1">h1 teste</h1>
        <h2 class="h2">h2 teste</h2>
        <h3 class="h3">h3 teste</h3>
        <h4 class="h4">h4 teste</h4>
        <h5 class="h5">h5 teste</h5>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
      </Card>
      <Card>
        <h1 class="h1">h1 teste</h1>
        <h2 class="h2">h2 teste</h2>
        <h3 class="h3">h3 teste</h3>
        <h4 class="h4">h4 teste</h4>
        <h5 class="h5">h5 teste</h5>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
      </Card>
      <Card>
        <h1 class="h1">h1 teste</h1>
        <h2 class="h2">h2 teste</h2>
        <h3 class="h3">h3 teste</h3>
        <h4 class="h4">h4 teste</h4>
        <h5 class="h5">h5 teste</h5>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p class="p">p Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada.Pra lá , depois divoltis porris, paradis.Interagi no mé, cursus quis, vehicula ac nisi.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
      </Card>

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
