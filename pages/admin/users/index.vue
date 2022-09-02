<template>
  <div class="w-full flex flex-col">


    <AppTitle>Usuários</AppTitle>

    <AppSearchBar placeholder="Procurar" v-model:search="search" @search="get()" />
    
    <div class="w-full flex flex-col space-y-6 mt-6">

      <AppLoaderPlaceholder v-if="!users" />

      <AppAlert v-else-if="!users.length">
        Nenhum usuário encontrado
      </AppAlert>

      <div
        v-else 
          class="w-full flex flex-col bg-white shadow-sm p-4 hover:shadow-lg"
          v-for="(user, index) in users"
          :key="`admin-user-${index}`"
        >

          <div class="w-full flex flex-wrap">
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Cadastrado em</template>
              <template v-slot:value>{{ user.createdAt }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Usuário</template>
              <template v-slot:value>{{ user.name }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Email</template>
              <template v-slot:value>{{ user.email }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>CPF</template>
              <template v-slot:value>{{ user.cpf }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Atribuição</template>
              <template v-slot:value>{{ user.role }}</template>
            </AppLabelValue>
          </div>

          <div class="w-full flex space-x-4 mt-4">
            <NuxtLink :to="`/admin/simulations?userId=${user.id}`" class="w-auto">
              <AppButton class="bg-brand-gradient text-white px-5">
                <AppIcons icon="zoom_in" />
                <span  class="ml-1">Ver simulações</span>
              </AppButton>
            </NuxtLink>
          </div>
        </div>
    </div>

    <AppPaginator v-model:skip="skip" :limit="limit" :length="users.length" @change="get()"/>

  </div>
</template>

<script setup>
  import GraphQL from '@/util/GraphQL'

  const search = ref('')
  const skip = ref(0)
  const limit = ref(12)
  const users = ref(false)

  onMounted(() => {
    get()
  })
  const get = () => {

    const query = `
      {
        users (
          skip: ${skip.value}
          take: ${limit.value}
          order: [
            { column: "name", direction: "ASC" }
          ]
          ${
            !search.value ? '' :  `
              where: [
                { column: "name", operation: "ilike", value: "%${search.value}%" }
              ]
            `
          }
        ) {
          key
          id
          name
          email
          phone
          role
          createdAt
        }
      }
    `
    
    
    GraphQL({ query })
      .then(({ data }) => {
        users.value = data.users
        if(!data.users.length) skip.value = 0
      })
  }


  
</script>