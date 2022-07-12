<template>
  <div class="w-full flex flex-col">
    <AppTitle>Grupos de aposentadoria</AppTitle>

    <div class="w-full flex flex-col space-y-6 mt-6">

      <AppLoaderPlaceholder :quantity="3" v-if="!retirementGroups" />

      <AppAlert v-else-if="!retirementGroups.length"
        >Nenhum grupo de aposentadoria encontrado</AppAlert
      >

      <div
        v-else
        class="w-full flex flex-col bg-white shadow-sm p-6 hover:shadow-lg cursor-move"
        v-for="(retirementGroup, index) in retirementGroups"
        :key="`admin-retirementGroup-${index}`"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragover.prevent
        @dragend="onDragEnd"
        @drop="onDragFinish(index, retirementGroups)"
      >
        <div class="w-full flex flex-wrap space-y-2">
          <div class="w-full flex flex-wrap border-b pb-2 mb-2">
            <AppLabelValue>
              <template v-slot:label>Grupo de aposentadoria</template>
              <template v-slot:value>{{ retirementGroup.title }}</template>
            </AppLabelValue>

            <NuxtLink
              :to="`/admin/retirement-groups/edit/${retirementGroup.id}`"
              class="ml-auto"
            >
              <AppButton class="bg-brand-gradient text-white px-5">
                <AppIcons icon="edit" />
                <span class="ml-1">Editar</span>
              </AppButton>
            </NuxtLink>
          </div>

          <div class="w-full flex flex-col space-y-4">
            <AppLabelValue class="mb-4">
              <template v-slot:value
                ><span class="border-b-4 pb-1"
                  >Regras de aposentadoria</span
                ></template
              >
            </AppLabelValue>
            <div
              class="w-full flex pb-2 last:border-b-0 border-b border-zinc-100"
              v-for="(
                retirementOption, indexRetirementOption
              ) in retirementGroup.retirementOptions"
              :key="`admin-retirementOption-${indexRetirementOption}`"
            >
              <div class="w-full flex">
                <AppLabelValue>
                  <template v-slot:label>Título</template>
                  <template v-slot:value>{{ retirementOption.title }}</template>
                </AppLabelValue>
                <NuxtLink
                  :to="`/admin/retirement-options/edit/${retirementOption.id}`"
                  class="ml-auto"
                >
                  <AppButton class="bg-brand-gradient text-white px-5">
                    <AppIcons icon="edit" />
                    <span class="ml-1">Editar</span>
                  </AppButton>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GraphQL from "@/util/GraphQL"
import useGeneralOrdenation from '@/util/functions/generalOrdenation'

const { onDragStart, onDragEnd, onDragFinish } = useGeneralOrdenation('RetirementGroup')

const query = `
  {
    retirementGroups (
      order: [
        { column: "order" }
      ]
    ) {
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

const retirementGroups = ref(false);

GraphQL({ query }).then(({ data }) => {
  retirementGroups.value = data.retirementGroups
})
</script>