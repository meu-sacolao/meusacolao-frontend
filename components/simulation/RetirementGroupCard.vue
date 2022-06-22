<template>
  <AppCard>
    <template v-slot:header>
      <div class="w-full flex space-x-2 pr-12">
        <h3 class="h3 truncate leading-relaxed ...">{{ simulationRetirementGroup.retirementGroup.title }}</h3>
      </div>
    </template>
    <template v-slot:content>

      <div class="w-full flex flex-col">
        <div 
          class="w-full flex flex-col shadow mb-4 p-4 relative" 
          v-for="(simulationRetirementOption, index) in simulationRetirementGroup.simulationRetirementOptions" 
          :key="`simulationRetirementOption${index}`"
        >

          <div class="w-full flex space-x-4 mb-4">
            <AppPill v-if="simulationRetirementOption.isGranted" bg="bg-emerald-600" text="text-white">
              <AppIcons icon="check_circle" />
              <span class="ml-2">Direito ao Benefício</span>
            </AppPill>
            <AppPill v-else bg="bg-zinc-300">
              <AppIcons icon="block" />
              <span class="ml-2">Não tem direito ao benefício</span>
            </AppPill>
            <h3 class="h4 truncate leading-relaxed ...">{{ simulationRetirementOption.retirementOption.title }}</h3>
          </div>

          <p class="p truncate text-slate-400 leading-relaxed ...">{{ simulationRetirementOption.retirementOption.content }}</p>

          <div class="w-full flex flex-col mt-4">

            <div 
              class="w-full flex items-center"
              v-for="(requirement, index) in simulationRetirementOption.requirements"
              :key="`retirementOptionError${index}`"
            >
              <AppIcons :icon="requirement.isGranted ? 'check' : 'warning'" :class="[!requirement.isGranted ? 'text-red-400' : 'text-green-600']" />
              <p class="ml-2 p truncate text-slate-600 leading-relaxed ...">{{ requirement.content }}</p>
            </div>
          </div>

          <div class="flex mt-6">
            <AppButton bg="bg-slate-300" @click="emitter.emit('openDrawer', { component: 'RetirementOptionDetailDrawer', payload: simulationRetirementOption })">Ver cálculo</AppButton>
          </div>
          
        </div>

      </div>
    </template>
  </AppCard>
</template>

<script>
export default {
  name: "SimulationRetirementGroupCard",
  props: ["simulationRetirementGroup"],
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