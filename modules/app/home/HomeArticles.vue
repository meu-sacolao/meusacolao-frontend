<template>
  <!-- HOME INTRO -->
  <div class="w-full bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-12 px-6 lg:px-20 xl:px-28" id="home-intro">
    
    <NuxtLink 
      :to="`/artigos/${ article.slug }`"
      v-for="article in articles" :key="article.id"
      class="border border-zinc-200 hover:shadow-lg"
    > 
      <AppIcons :icon="article.pathUrl" iconClasses="aspect-square w-full object-contains bg-zinc-100" />
      <div class="w-full p-4 lg: p-6">
        <div class="w-full flex flex-col">
          <p class="p">{{ article.user.name }}</p>
          <p class="p text-xs">{{ article.publishedAt }}</p>
        </div>
        <h5 class="h5 leading-relaxed mt-1">{{ article.title }}</h5>
      </div>
    </NuxtLink>
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