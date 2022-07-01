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

    <div class="w-full flex flex-col space-y-6">
        <div 
          class="w-full flex flex-col bg-white shadow-sm p-6 hover:shadow-lg"
          v-for="(article, index) in articles"
          :key="`admin-article-${index}`"
        >

          <div class="w-full flex flex-wrap space-y-2">

            <div class="w-full flex flex-wrap border-b pb-2 mb-2">
              <AppLabelValue>
                <template v-slot:label>Artigo</template>
                <template v-slot:value>{{ article.title }}</template>
              </AppLabelValue>
              <AppLabelValue>
                <template v-slot:label>Está publicado</template>
                <template v-slot:value>{{ article.isPublished }}</template>
              </AppLabelValue>
              <AppLabelValue>
                <template v-slot:label>É destaque</template>
                <template v-slot:value>{{ article.isStarred }}</template>
              </AppLabelValue>

              <NuxtLink :to="`/admin/articles/edit/${ article.id }`" class="ml-auto">
                <AppButton class="bg-brand-gradient text-white px-5">
                  <AppIcons icon="edit" />
                  <span  class="ml-1">Editar</span>
                </AppButton>
              </NuxtLink>
            </div>

            <div class="w-full">
              
            </div>
          </div>

        </div>
    </div>
  </div>
</template>

<script setup>
import GraphQL from '@/util/GraphQL'

const query = `
  {
    articles (
      order: [
        { column: "order" }
      ]
    ) {
      key
      id
      title
      content
      pathUrl
      isPublished
      isStarred
      createdAt
      updatedAt
    }
  }
`

const articles = ref([])

GraphQL({ query })
  .then(({ data }) => {
    articles.value = data.articles
  })

  
</script>