<template>

  <div class="w-full flex flex-col">
    <h3 class="text-zinc-400 leading-none">Últimas notícias</h3>
    <div class="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <AppArticleCard
        v-for="article in articles" :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script setup>

  import GraphQL from '@/util/GraphQL'

  const articles = ref([])

  onMounted(() => {
    getLastNews()
  })

  const getLastNews = () => {

    const query = `
      {
        categories (
          where: [
            { column: "slug", value: "noticias" }
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

    GraphQL({ query, caller: 'getLastNews' })
      .then(({ data }) => {
        articles.value = data.categories[0].articles
      })

  }

</script>