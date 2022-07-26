<template>
  <div class="w-full flex flex-col">
    <AppTitle>Minhas Simulações</AppTitle>

    <div class="w-full flex flex-col space-y-6 mt-6">

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
            <template v-slot:label>Segurado</template>
            <template v-slot:value>{{ simulation.client.name }}</template>
          </AppLabelValue>
          <AppLabelValue class="four-cols-breakdown">
            <template v-slot:label>Data do cálculo</template>
            <template v-slot:value>{{ simulation.retirementDate }}</template>
          </AppLabelValue>
        </div>

        <div class="w-full flex space-x-4 mt-4">
          <NuxtLink :to="`/simulacao/${simulation.id}`" class="w-auto">
            <AppButton class="bg-brand-gradient text-white px-5">
              <AppIcons icon="zoom_in" />
              <span  class="ml-1">Ver simulação</span>
            </AppButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GraphQL from '@/util/GraphQL'

const route = useRoute()

const query = `
  {

    currentUser {
      simulations (
        order: [
          { column: "createdAt", direction: "DESC" }
        ]
      ) {
        key
        id
        title
        retirementDate  
        createdAt
        client {
          id
          name
        }
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
  }
`

const simulations = ref(false)

GraphQL({ query })
  .then(({ data }) => {
    simulations.value = data.currentUser.simulations
  })

  
</script>