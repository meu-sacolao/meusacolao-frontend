<template>
  <div class="w-full flex flex-col">

    <div class="w-full flex flex-wrap items-center">

    <AppTitle>Categorias de Artigos</AppTitle>
    <NuxtLink :to="`/admin/categories/create`" class="ml-auto">
        <AppButton class="bg-brand-gradient text-white px-5">
          <AppIcons icon="edit" />
          <span  class="ml-1">Adicionar categoria</span>
        </AppButton>
      </NuxtLink>
    </div>

    <div class="w-full flex flex-col space-y-6 mt-6">

      <AppLoaderPlaceholder v-if="!categories" />

      <AppAlert v-else-if="!categories.length"
        >Nenhuma categoria encontrado</AppAlert
      >

      <AdminCategoryCard
        v-else 
        class="w-full flex flex-col bg-white shadow-sm p-6 hover:shadow-lg relative"
        v-for="(category, index) in categories"
        :key="`admin-category-${index}`"
        :category="category"
      />
    </div>
  </div>
</template>

<script setup>
  import GraphQL from '@/util/GraphQL'
  import AdminCategoryCard from '@/modules/admin/categories/AdminCategoryCard.vue'

  const categories = ref(false)

  const query = `
    {
      categories (
        order: [
          { column: "order" }
        ]
      ) {
        key
        id
        title
        isList
        order
      }
    }
  `


  GraphQL({ query, caller: 'Admin.categories' })
    .then(({ data }) => {
      categories.value = data.categories
    })

</script>