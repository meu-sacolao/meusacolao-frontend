<template>

  <div class="w-full flex flex-col space-y-6">

    <AppLoaderPlaceholder :quantity="3" v-if="!article"/>

    <AppCard v-else>
      <template v-slot:header>
        <h3 class="h3">{{ article.title }}</h3>
        <p>Por: {{ article.user.name }}</p>
        <p class="text-zinc-400 text-xs">{{ article.publishedAt }}</p>
      </template>
      <template v-slot:content>
        <div v-html="article.content" />
      </template>
    </AppCard>

    <HomeArticleContactCard />
  </div>
</template>

<script setup>

  import GraphQL from '@/util/GraphQL'
  import HomeArticleContactCard from '@/modules/app/home/HomeArticleContactCard.vue'
  const route = useRoute()

  const article = ref(false)

  onMounted(() => {
    getArticle()
  })

  const getArticle = () => {

    const query = `
      {
        articles (
          where: [
            { column: "slug", value: "${route.params.articleSlug}" }
          ]
        ) {
          id
          title
          content
          pathUrl
          publishedAt
          isPublished
          user {
            id
            name
          }
        }
      }
    
    `

    GraphQL({ query, caller: 'artigos.get' })
      .then(({ data }) => {
        article.value = data.articles[0]
      })
  }

</script>