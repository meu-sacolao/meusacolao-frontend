<template>
  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap items-center space-y-4 border-b">
      <AppTitle>{{ typeLabel }} Grupos de aposentadoria</AppTitle>
    </div>

    <div class="mt-6 flex flex-col space-y-4">
      <AppInputWithIcon v-model:value="retirementGroup.title" label="Título" placeholder="Insira o título do grupo de aposentadoria" />
      
      <AppTextEditorInput 
        input_id="retirement-group-editor" 
        v-model:value="retirementGroup.description" 
        label="Descrição curta (até 3 linhas)"
        height="100"
      />

      <AppTextEditorInput 
        input_id="retirement-group-editor" 
        v-model:value="retirementGroup.content" 
        label="Descrição completa"
      />

      <AppCheckBox
        v-model:value="retirementGroup.isPreReform"
      >
        É pré reforma
      </AppCheckBox>

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

import RetirementGroup from '@/entities/RetirementGroup'
import AdminGeneralApiService from '@/services/AdminGeneralApiService'
import Api from '@/util/Api'
import GraphQL from '@/util/GraphQL'

  const router = useRouter()
  const route = useRoute()
  const retirementGroup = ref(new RetirementGroup())
  const { type, retirementGroupId } = route.params
  const typeLabel = computed(() => {
    return type == 'edit' ? 'Editar' : 'Adicionar'
  })

  const hasError = computed(() => {
    return !retirementGroup.value.title || !retirementGroup.value.description
  })

  onMounted(() => {
    if(retirementGroupId) get()
  })

  const get = () => {
    const query = `
      {
        retirementGroups (
          where: [
            { column: "id", value: "${retirementGroupId}" }
          ]
        ) {
          key
          id
          title
          description
          content
          isPreReform
        }
      }
    `

    GraphQL({ query, caller: 'AdminRetirementGroup' })
      .then(({ data }) => {
        retirementGroup.value = data.retirementGroups[0]
      })
  }

  const updateOrCreate = () => {
    AdminGeneralApiService.updateOrCreate('RetirementGroup', retirementGroup.value)
      .then((response) => {
        alert('Grupo de aposentadoria atualizado com sucesso')
        router.push(`/admin/retirement-groups`)
      })
      .catch((err) => {
        alert('Erro ao atualizar grupo de aposentadoria')
        console.log(err)
      })
  }
  
</script>
