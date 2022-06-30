<template>
  <div class="w-full flex flex-col">
    <AppTitle>Regras de aposentadoria</AppTitle>

    <div class="w-full flex flex-col space-y-6">
        <div 
          class="w-full flex flex-col bg-white shadow-sm p-4 hover:shadow-lg"
          v-for="(retirementOption, index) in retirementOptions"
          :key="`admin-retirementOption-${index}`"
        >

          <div class="w-full flex flex-wrap space-y-2">
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Título</template>
              <template v-slot:value>{{ retirementOption.title }}</template>
            </AppLabelValue>

            <div class="w-full">
              <NuxtLink :to="`/admin/retirement-options/edit/${ retirementOption.id }`" class="w-auto">
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
    retirementOptions {
      key
      id
      title
      createdAt
    }
  }
`

const retirementOptions = ref([])

GraphQL({ query })
  .then(({ data }) => {
    retirementOptions.value = data.retirementOptions
  })

  
</script>