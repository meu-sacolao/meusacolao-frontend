<template>
  <div class="w-full flex flex-col">
    <AppTitle>Grupos de aposentadoria</AppTitle>

    <div class="w-full flex flex-col space-y-6">
        <div 
          class="w-full flex flex-col bg-white shadow-sm p-4 hover:shadow-lg"
          v-for="(retirementGroup, index) in retirementGroups"
          :key="`admin-retirementGroup-${index}`"
        >

          <div class="w-full flex flex-wrap space-y-2">
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Título</template>
              <template v-slot:value>{{ retirementGroup.title }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Regras de aposentadoria</template>
              <template v-slot:value>{{ retirementGroup.retirementOptions.length }}</template>
            </AppLabelValue>

            <div class="w-full">
              <NuxtLink :to="`/admin/retirement-groups/edit/${ retirementGroup.id }`" class="w-auto">
                <AppButton class="bg-brand-gradient text-white rounded-full px-5">
                  <AppIcons icon="zoom_in" />
                  <span  class="ml-1">Editar</span>
                </AppButton>
              </NuxtLink>
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
    retirementGroups {
      key
      id
      title
      createdAt
      retirementOptions {
        id
        title
      }
    }
  }
`

const retirementGroups = ref([])

GraphQL({ query })
  .then(({ data }) => {
    retirementGroups.value = data.retirementGroups
  })

  
</script>