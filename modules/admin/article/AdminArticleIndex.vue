<template>
  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap items-center">

    <AppTitle>Artigos</AppTitle>
    <NuxtLink :to="`/admin/articles/create`" class="ml-auto">
        <AppButton class="bg-brand-gradient text-white px-5">
          <AppIcons icon="edit" />
          <span  class="ml-1">Adicionar artigo</span>
        </AppButton>
      </NuxtLink>
    </div>
    

    <AdminArticleList
      :articles="articles"
    />
  </div>
</template>

<script setup>
import GraphQL from '@/util/GraphQL'
import Api from '@/util/Api'
import AdminArticleList from '@/modules/admin/article/AdminArticleList.vue'

const articles = ref(false)

onMounted(() => {
  get()
})

const get = () => {
  const query = `
    {
      articles (
        order: [
          { column: "publishedAt", direction: "DESC" }
        ]
      ) {
        key
        id
        title
        content
        pathUrl
        isPublished
        publishedAt
        createdAt
        updatedAt
        user {
          id
          name
        }
      }
    }
  `
  
  
  GraphQL({ query })
    .then(({ data }) => {
      articles.value = data.articles
    })

}

  
</script>