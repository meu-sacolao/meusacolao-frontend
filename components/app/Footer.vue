<template>
  
  <div class="w-full flex flex-col p-10 footer bg-brand-gradient">

    <div class="border-b border-slate-500 flex items-center justify-between pb-8">
      <nuxt-link to="/">
        <img src="/images/logo/1x/LOGO_2_1_1x.png" class="h-14" alt="Logo Calculo e previdência"/>
      </nuxt-link>
      <NuxtLink to="/calcule-sua-aposentadoria">
        <AppButton class="sm:block bg-amber-600 text-white rounded-full px-6">
          Calcule sua aposentadoria
        </AppButton>
      </NuxtLink> 
    </div>

    <div class="border-b border-slate-500 flex flex-wrap items-start justify-between py-8 text-zinc-200 space-y-6">
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Acesso</h5>
        <ul class="space-y-2 mt-4">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/calcule-sua-aposentadoria">Calcule sua aposentadoria</NuxtLink>
          </li>
          <li>Suas simulações</li>
          <li>Cadastre-se</li>
          <li>Login</li>
        </ul>
      </div>
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Sobre</h5>
        <ul class="space-y-2 mt-4">
          <li>Sobre nós</li>
          <li>Como sua aposentadoria é calculada</li>
        </ul>
      </div>
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Artigos</h5>
        <ul class="space-y-2 mt-4">

          <li v-for="article in articles" :key="article.id">
            <NuxtLink  :to="`/artigos/${ article.slug }`">
              {{ article.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Fale conosco</h5>
        <ul class="space-y-2 mt-4">
          <li>Contato</li>
        </ul>
      </div>
    </div>

    <div class="pt-10 flex flex-wrap justify-between space-y-4 text-zinc-400">

      <div class="w-full md:w-1/2 text-center md:text-left">
        Calculo e Previdência - CNPJ 10.100.100/0001-01
      </div>
      <div class="w-full md:w-1/2 flex justify-center md:justify-end text-zinc-400 space-x-3 items-center">
        <p class="font-thin italic">Developed by</p>
        <a href="https://igortrindade.dev" target="_blank">
          <img src="/images/partners/logo_igortrindade.png" class="h-8" alt="Logo Igor Trindade"/>
        </a>
        <a href="#" target="_blank">
          Digi3
        </a>
      </div>
    </div>
    
  </div>
</template>


<script setup>
  import GraphQL from '@/util/GraphQL'

  const articles = ref([])

  onMounted(() => {
    getFooterArticles()
  })

  const getFooterArticles = () => {

    const query = `
      {
        categories (
          where: [
            { column: "slug", value: "footer" }
          ]
        ) {
          id
          title
          articles (
            take: 3
            joinWhere: [
              { column: "isPublished", table: "articles", value: "true" }
            ]
            order: [
              { column: "article_to_category_order", direction: "ASC" }
            ]
          ) {
            id
            title
            slug
            pathUrl
          }
        }
      }
    
    `

    GraphQL({ query, caller: 'HomeArticles' })
      .then(({ data }) => {
        articles.value = data.categories[0].articles
      })
  }

</script>

<style lang="scss">

  .footer {
    box-shadow: rgba(0, 0, 0, 0.15) 0px -10px 30px -12px;
  }
</style>