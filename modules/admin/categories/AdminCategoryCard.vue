<template>
  <div class="w-full flex flex-col bg-white shadow-sm p-6 hover:shadow-lg relative" >
    <div class="w-full flex flex-col space-y-2">

      <AppLabelValue class="w-3/4">
        <template v-slot:label>Categoria</template>
        <template v-slot:value>{{ category.title }}</template>
      </AppLabelValue>
      <div class="w-full flex flex-wrap border-b pb-2 mb-2">
        <AppLabelValue class="four-cols-breakdown">
          <template v-slot:label>É visível?</template>
          <template v-slot:value><AppBooleanLabel :value="category.isList" /></template>
        </AppLabelValue>

        <NuxtLink :to="`/admin/categories/edit/${ category.id }`" class="absolute top-0 right-0 mr-4 mt-4">
          <AppButton class="bg-brand-gradient text-white px-5">
            <AppIcons icon="edit" />
            <span  class="ml-1">Editar</span>
          </AppButton>
        </NuxtLink>
      </div>

      <div class="flex items-center cursor-pointer" @click.stop="toggleCard()"> 
        <span 
          class="mr-1 -ml-1 material-icons material-symbols-sharp text-slate-400 flex-none transition-all transform  text-2xl"
          :class="showContent ? 'rotate-90' : 'closed rotate-0'"
        >
          chevron_right
        </span>
        <div class="w-full flex flex-col">
          <h3 class="h3 flex-none text-slate-400">Artigos</h3>
        </div>
      </div>

      <AdminArticleList v-if="showContent" :articles="articles" />

    </div>

  </div>
</template>

<script setup>
import GraphQL from "@/util/GraphQL"
import AdminArticleList from '@/modules/admin/article/AdminArticleList.vue'

  const props = defineProps({
    category: Object
  })

  const showContent = ref(false)
  const articles = ref(false)

  const toggleCard = () => {
    showContent.value = !showContent.value
    getArticles()
  }

  const getArticles = () => {
    const query = `
      {
        categories (
          where: [
            { column: "id", value: "${props.category.id}" }
          ]
        ) {
          id
          title
          articles (
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

    GraphQL({ query, caller: 'AdminCategoryCard' })
      .then(({ data }) => {
        articles.value = data.categories[0].articles
      })
  }

</script>