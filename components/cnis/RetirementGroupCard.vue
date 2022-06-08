<template>
  <AppCard>
    <template v-slot:header>
      <div class="w-full flex space-x-2 pr-12">
        <h3 class="h3 truncate leading-relaxed ...">{{ retirementGroup.title }}</h3>
      </div>
    </template>
    <template v-slot:content>

      <div class="w-full flex flex-col">
        <div 
          class="w-full flex flex-col shadow mb-4 p-4 relative" 
          v-for="(retirementOption, index) in retirementGroup.retirementOptions" 
          :key="`retirementOption${index}`"
        >

          <div class="w-full flex space-x-4 mb-4">
            <AppPill v-if="retirementOption.isGranted" bg="bg-emerald-600" text="text-white">
              <AppIcons icon="check_circle" />
              <span class="ml-2">Apto para o benefício</span>
            </AppPill>
            <AppPill v-else bg="bg-zinc-300">
              <AppIcons icon="block" />
              <span class="ml-2">Não apto para o benefício</span>
            </AppPill>
            <h3 class="h4 truncate leading-relaxed ...">{{ retirementOption.title }}</h3>
          </div>

          <p class="p truncate text-slate-400 leading-relaxed ...">{{ retirementOption.description }}</p>

          <div class="w-full flex flex-col mt-4">

            <div 
              class="w-full flex"
              v-for="(error, index) in retirementOption.errors"
              :key="`retirementOptionError${index}`"
            >
              <AppIcons icon="warning" class="text-red-400" />
              <p class="ml-2 p truncate text-slate-600 leading-relaxed ...">{{ error }}</p>
            </div>
          </div>
          
        </div>

      </div>
    </template>
  </AppCard>
</template>

<script>
export default {
  name: "CnisRetirementInfoCard",
  props: ["retirementGroup"],
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    toggleCard() {
      this.showContent = !this.showContent;
    }
  }
}
</script>