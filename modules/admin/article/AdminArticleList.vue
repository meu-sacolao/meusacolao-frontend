<template>
  <div class="w-full flex flex-col space-y-6 mt-6">

    <AppLoaderPlaceholder v-if="!articles" />

    <AppAlert v-else-if="!articles.length"
      >Nenhum artigo encontrado</AppAlert
    >

    <div
      v-else 
        class="w-full flex flex-col bg-white border border-zinc-100 shadow-sm p-6 hover:shadow-lg relative"
        v-for="(article, index) in articles"
        :key="`admin-article-${index}`"
      >

        <div class="w-full flex flex-col space-y-2">

          <AppLabelValue class="w-3/4">
            <template v-slot:label>Título</template>
            <template v-slot:value>{{ article.title }}</template>
          </AppLabelValue>
          <div class="w-full flex flex-wrap pb-2 mb-2">
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Autor</template>
              <template v-slot:value>{{ article.user.name }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Está publicado</template>
              <template v-slot:value><AppBooleanLabel :value="article.isPublished" /></template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Publicado em</template>
              <template v-slot:value>{{ article.publishedAt }}</template>
            </AppLabelValue>

            <AppIcons 
              iconClasses="aspect-ratio h-12" 
              :icon="article.pathUrl" 
              errorIcon="/images/general/noticias.jpg"
            />

            <div class="absolute top-0 right-0 mr-4 mt-4 flex space-x-2">

              <div class="absolute top-0 right-0 flex justify-end">
                <NuxtLink :to="`/artigos/${ article.slug }`" class="">
                  <AppButton class="text-zinc-400 hover:text-orange-600">
                    <AppIcons icon="search" />
                    <span  class="ml-1"></span>
                  </AppButton>
                </NuxtLink>
                <NuxtLink :to="`/admin/articles/edit/${ article.id }`" class="">
                  <AppButton class="text-zinc-400 hover:text-orange-600">
                    <AppIcons icon="edit" />
                    <span  class="ml-1"></span>
                  </AppButton>
                </NuxtLink>
                <AppButton 
                  @click="destroy(article)" 
                  class="text-zinc-400 hover:text-orange-600">
                  <AppIcons icon="delete_forever" />
                </AppButton>
              </div>
            </div>
          </div>
        </div>

      </div>
  </div>
</template>

<script setup>
  import Api from '@/util/Api'

  const props = defineProps({
    articles: [Boolean, Object, Array]
  })

  const destroy = (article) => {
    if(confirm(`Tem certeza que gostaria de excluir permanentemente o artigo: ${ article.title }?`))

    Api.delete(`/admin/general/destroy`, { data: { id: article.id, entity: 'Article' }})
      .then(() => {
        get()
        alert('Artigo removido com sucesso')
      })
  }

  
</script>