<template>
  <div class="w-full flex flex-col">
    <AppTitle>Usuários</AppTitle>

    <div class="w-full flex flex-col space-y-6">
        <div 
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
        </div>
    </div>
  </div>
</template>

<script setup>
import GraphQL from '@/util/GraphQL'

const query = `
  {
    users {
      key
      id
      name
      email
      cpf
      phone
      role
      createdAt
      simulations {
        id
        title
      }
    }
  }
`

const users = ref([])

GraphQL({ query })
  .then(({ data }) => {
    users.value = data.users
  })

  
</script>