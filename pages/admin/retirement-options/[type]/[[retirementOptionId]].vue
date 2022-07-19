<template>
  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap items-center space-y-4 border-b">
      <AppTitle>{{ typeLabel }} Regras de aposentadoria</AppTitle>
    </div>

    <div class="mt-6 flex flex-col space-y-4">
      <AppInputWithIcon v-model:value="retirementOption.title" label="Título" placeholder="Insira o título do grupo de aposentadoria" />
      
      <AppSelectInput
        v-model:value="retirementOption.retirementGroupId"
        :items="retirementGroups"
        label="Grupo de aposentadoria"
      />
      
      <AppTextEditorInput 
        input_id="retirement-group-editor" 
        v-model:value="retirementOption.description" 
        label="Descrição curta (até 3 linhas)"
        height="100"
      />

      <AppTextEditorInput 
        input_id="retirement-group-editor" 
        v-model:value="retirementOption.content" 
        label="Descrição completa"
      />

      <AppCheckBox
        v-model:value="retirementOption.showForNotLoggedUsers"
      >
        Mostrar para usuários não logados
      </AppCheckBox>

    </div>
    <div class="w-full flex mt-6">
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

</template>

<script setup>

import RetirementOption from '@/entities/RetirementOption'
import AdminGeneralApiService from '@/services/AdminGeneralApiService'
import Api from '@/util/Api'
import GraphQL from '@/util/GraphQL'

  const router = useRouter()
  const route = useRoute()
  const { type, retirementOptionId } = route.params

  const retirementOption = ref(new RetirementOption())
  const retirementGroups = ref([])
  
  const typeLabel = computed(() => {
    return type == 'edit' ? 'Editar' : 'Adicionar'
  })

  const hasError = computed(() => {
    return !retirementOption.value.title || !retirementOption.value.description
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
          description
          content
          retirementGroupId
          showForNotLoggedUsers
          retirementGroup {
            id
            title
          }
        }

        retirementGroups {
          id
          title
        }
      }
    `

    GraphQL({ query, caller: 'AdminRetirementOption' })
      .then(({ data }) => {
        retirementOption.value = data.retirementOptions[0]
        retirementGroups.value = data.retirementGroups
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
