<template>
  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap items-center space-y-4 border-b">
      <AppTitle>{{ typeLabel }} Regras de aposentadoria</AppTitle>
    </div>

    <div class="mt-6 flex flex-col space-y-4">
      <AppInputWithIcon v-model:value="retirementOption.title" label="Título" placeholder="Insira o título do grupo de aposentadoria" />
      <AppTextEditorInput 
        input_id="retirement-group-editor" 
        v-model:value="retirementOption.content" 
        label="Conteúdo auxiliar"
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

import RetirementOption from '@/entities/RetirementOption'
import AdminGeneralApiService from '@/services/AdminGeneralApiService'
import Api from '@/util/Api'
import GraphQL from '@/util/GraphQL'

  const router = useRouter()
  const route = useRoute()
  const retirementOption = ref(new RetirementOption())
  const { type, retirementOptionId } = route.params
  const typeLabel = computed(() => {
    return type == 'edit' ? 'Editar' : 'Adicionar'
  })

  const hasError = computed(() => {
    return !retirementOption.value.title || !retirementOption.value.content
  })

  onMounted(() => {
    if(retirementOptionId) get()
  })

  const get = () => {
    const query = `
      {
        retirementOptions (
          where: [
            { column: "id", value: "${retirementOptionId}" }
          ]
        ) {
          key
          id
          title
          content
          retirementGroupId
          retirementGroup {
            id
            title
          }
        }
      }
    `

    GraphQL({ query, caller: 'AdminRetirementOption' })
      .then(({ data }) => {
        retirementOption.value = data.retirementOptions[0]
      })
  }

  const updateOrCreate = () => {
    AdminGeneralApiService.updateOrCreate('RetirementOption', retirementOption.value)
      .then((response) => {
        alert('Regra de aposentadoria atualizado com sucesso')
        router.push(`/admin/retirement-groups`)
      })
      .catch((err) => {
        alert('Erro ao atualizar regra de aposentadoria')
        console.log(err)
      })
  }
  
</script>
