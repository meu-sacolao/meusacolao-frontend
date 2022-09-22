<template>
  <!-- HOME ARTICLES -->
  <div class="w-full flex flex-col p-12 px-6 lg:px-20 xl:px-28 bg-white">
    <h3 class="text-zinc-400">Artigos</h3>
    <div class="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="home-articles">
      
      <AppArticleCard
        v-for="article in articles" :key="article.id"
        :article="article"
      />

    </div>

    <div class="mt-6 w-full flex justify-center items-center">
      <NuxtLink  to="/artigos">
        <AppButton class="border-2 border-zinc-400 text-zinc-500 text-sm rounded-full hover:shadow">
          Mais notícias
        </AppButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>

  import GraphQL from '@/util/GraphQL'
  import Api from '@/util/Api'

  const articles = ref([])

  onMounted(() => {
    getHomeArticles()
  })

  const getHomeArticles = () => {

    const query = `
      {
        categories (
          where: [
            { column: "slug", value: "home" }
          ]
        ) {
          id
          title
          articles (
            take: 8
            joinWhere: [
              { column: "isPublished", table: "articles", value: "true" }
            ]
            order: [
              { column: "articles.publishedAt", direction: "DESC" }
            ]
          ) {
            id
            title
            slug
            pathUrl
            createdAt
            publishedAt
            user {
              name
            }
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