<template>
  <AppCard v-if="article">
    <template v-slot:header>
      <h3 class="h3">{{ article.title }}</h3>
      <p>Por: {{ article.user.name }}</p>
      <p>{{ article.publishedAt }}</p>
    </template>
    <template v-slot:content>
      <div v-html="article.content" />
    </template>
  </AppCard>
</template>

<script setup>

  import GraphQL from '@/util/GraphQL'

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