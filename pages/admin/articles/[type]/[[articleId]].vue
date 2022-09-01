<template>
  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap items-center space-y-4 border-b">
      <AppTitle>{{ typeLabel }} Artigo</AppTitle>
    </div>

    <div class="mt-6 flex flex-col space-y-4">
      
      <AppSelectInput
        v-model:value="categorySelected"
        :items="getCategoriesToSelect"
        keyValue="id"
        keyLabel="title"
        label="Categoria"
        @update:value="setCategory"
      />

      <div class="w-full flex flex-wrap space-x-2 -mt-4">
        <AppPill bg="bg-zinc-300 relative pr-8" v-for="(category, index) in article.categories" :key="category.id">
          <span>{{ category.title }}</span>
          <AppButton class="absolute top-o right-0 mt-0 mr-0" @click="article.categories.splice(index, 1)">
            <AppIcons icon="close" size="18"/>
          </AppButton>
        </AppPill>
      </div>

      <AppInputWithIcon v-model:value="article.title" label="Título" placeholder="Insira o título do artigo" />
      
      <AppTextEditorInput 
        input_id="article-editor" 
        v-model:value="article.content" 
        label="Conteúdo auxiliar"
      />

      <AppSelectInput
        v-model:value="article.userId"
        :items="users"
        keyValue="id"
        keyLabel="name"
        label="Autor"
      />

      <AppInputWithIcon 
        v-model:value="article.publishedAt" 
        icon="today"
        label="Data da publicação"
        :mask="'##/##/####'"
        type="tel"
        placeholder="Data da publicação" 
      />

      <AppCheckBox
        v-model:value="article.isPublished"
      >
        Esta publicado?
      </AppCheckBox>

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
import { ArrayHelpers } from '@igortrindade/lazyfy'

  const router = useRouter()
  const route = useRoute()
  const article = ref(new Article())
  const users = ref([])
  const categories = ref([])
  const categorySelected = ref(null)
  const { type, articleId } = route.params
  const typeLabel = computed(() => {
    return type == 'edit' ? 'Editar' : 'Adicionar'
  })

  const hasError = computed(() => {
    return !article.value.title || !article.value.content
  })

  const getCategoriesToSelect = computed(() => {
    if(!article.value) return []
    const articleCategoriesIds = article.value.categories.map((category) => category.id)
    return ArrayHelpers.removeAll(categories.value, { id: articleCategoriesIds })
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
          userId
          title
          slug
          content
          pathUrl
          isPublished
          publishedAt
          categories {
            id
            title
          }
        }

        users {
          id
          name
        }

        categories {
          id
          title
        }
      }
    `

    GraphQL({ query, caller: 'AdminArticle' })
      .then(({ data }) => {
        article.value = data.articles[0]
        users.value = data.users
        categories.value = data.categories
      })
  }

  const updateOrCreate = () => {
    AdminGeneralApiService.updateOrCreate('Article', article.value, '/admin/article/updateOrCreate')
      .then((response) => {
        alert('Artigo atualizado com sucesso')
        router.push(`/admin/articles`)
      })
      .catch((err) => {
        alert('Erro ao atualizar artigo')
        console.log(err)
      })
  }

  const setCategory = (id) => {
    const category = ArrayHelpers.find(categories.value, { id })
    if(category) {
      article.value.categories.push(category)
    }
  }
  
</script>
