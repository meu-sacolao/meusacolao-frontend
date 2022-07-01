<template>
  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap items-center space-y-4 border-b">
      <AppTitle>{{ typeLabel }} Artigo</AppTitle>
    </div>

    <div class="mt-6 flex flex-col space-y-4">
      
      <AppInputWithIcon v-model:value="article.title" label="Título" placeholder="Insira o título do artigo" />
      
      <AppTextEditorInput 
        input_id="article-editor" 
        v-model:value="article.content" 
        label="Conteúdo auxiliar"
      />

      <AppUploadInput 
        placeholder="Clique ou arraste uma imagem de capa"
        v-model="article.file" 
        accept="images/*"
        label="Imagem de capa"
      />

      <div class="w-full flex">
        <AppButton 
          :disabled="hasError" 
          class="bg-brand-gradient text-white px-5"
          @click="updateOrCreate()"
        >
          <AppIcons icon="save" />
          <span  class="ml-1">Salvar</span>
        </AppButton>
      </div>
    </div>

  </div>

</template>

<script setup>

import Article from '@/entities/Article'
import AdminGeneralApiService from '@/services/AdminGeneralApiService'
import Api from '@/util/Api'
import GraphQL from '@/util/GraphQL'

  const router = useRouter()
  const route = useRoute()
  const article = ref(new Article())
  const { type, articleId } = route.params
  const typeLabel = computed(() => {
    return type == 'edit' ? 'Editar' : 'Adicionar'
  })

  const hasError = computed(() => {
    return !article.value.title || !article.value.content
  })

  onMounted(() => {
    if(articleId) get()
  })

  const get = () => {
    const query = `
      {
        articles (
          where: [
            { column: "id", value: "${articleId}" }
          ]
        ) {
          key
          id
          title
          slug
          content
          pathUrl
          isPublished
          isStarred
        }
      }
    `

    GraphQL({ query, caller: 'AdminArticle' })
      .then(({ data }) => {
        article.value = data.articles[0]
      })
  }

  const updateOrCreate = () => {
    AdminGeneralApiService.updateOrCreate('Article', article.value)
      .then((response) => {
        alert('Artigo atualizado com sucesso')
        router.push(`/admin/articles`)
      })
      .catch((err) => {
        alert('Erro ao atualizar artigo')
        console.log(err)
      })
  }
  
</script>
