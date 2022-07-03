<template>
  <div class="w-full flex flex-col">
    <AppTitle>Simulações</AppTitle>

    <div class="w-full flex flex-col space-y-6">

      <AppLoaderPlaceholder :quantity="3" v-if="!simulations" />

      <AppAlert v-else-if="!simulations.length">Nenhuma simulação encontrada</AppAlert>

      <div 
        v-else
        class="w-full flex flex-col bg-white shadow-sm p-4 hover:shadow-lg"
        v-for="(simulation, index) in simulations"
        :key="`admin-simulation-${index}`"
      >

        <div class="w-full flex flex-wrap">
          <AppLabelValue class="four-cols-breakdown">
            <template v-slot:label>Data</template>
            <template v-slot:value>{{ simulation.createdAt }}</template>
          </AppLabelValue>
          <AppLabelValue class="four-cols-breakdown">
            <template v-slot:label>Usuário</template>
            <template v-slot:value>{{ simulation.user.name }}</template>
          </AppLabelValue>
          <AppLabelValue class="four-cols-breakdown">
            <template v-slot:label>Data pedido</template>
            <template v-slot:value>{{ simulation.retirementDate }}</template>
          </AppLabelValue>
        </div>

        <div class="w-full flex space-x-4 mt-4">
          <NuxtLink :to="`/simulacao/${simulation.id}`" target="_blank" class="w-auto">
            <AppButton class="bg-brand-gradient text-white rounded-full px-5">
              <AppIcons icon="zoom_in" />
              <span  class="ml-1">Ver online</span>
            </AppButton>
          </NuxtLink>
          <a v-if="simulation.cnisFile" :href="simulation.cnisFile.pathUrl" target="_blank">
            <AppButton class="bg-brand-gradient text-white rounded-full px-5">
              <AppIcons icon="picture_as_pdf" />
              <span class="ml-1">Download arquivo cnis</span>
            </AppButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GraphQL from '@/util/GraphQL'

const query = `
  {
    simulations {
      key
      id
      title
      retirementDate  
      createdAt
      user {
        id
        name
      }
      cnisFile {
        id
        pathUrl
      }
    }
  }
`

const simulations = ref(false)

GraphQL({ query })
  .then(({ data }) => {
    simulations.value = data.simulations
  })

  
</script>