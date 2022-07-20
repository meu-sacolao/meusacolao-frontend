<template>


  <div class="w-full flex flex-col space-y-4 shadow hover:shadow-md border border-zinc-100 mb-4 p-4 relative">
    <div class="w-full flex flex-wrap">
      <div class="mr-4">
        <AppPill v-if="simulationRetirementOption.isGranted" bg="bg-emerald-600" text="text-white">
          <AppIcons icon="check_circle" />
          <span class="ml-2">Direito ao Benefício</span>
        </AppPill>
        <AppPill v-else bg="bg-zinc-300">
          <AppIcons icon="block" />
          <span class="ml-2">Não tem direito ao benefício</span>
        </AppPill>
      </div>
      <h3 class="h4 leading-relaxed">{{ simulationRetirementOption.retirementOption.title }}</h3>
    </div>

    <div class="p text-slate-400 leading-relaxed" v-html="simulationRetirementOption.retirementOption.content"></div>

    <div class="w-full flex flex-col space-y-4" v-if="simulationRetirementOption.age || simulationRetirementOption.contributionTime">
      <AppLabelValue>
        <template v-slot:label>Data base</template>
        <template v-slot:value>{{ simulationRetirementOption.contextDate }}</template>
      </AppLabelValue>
      <AppLabelValue>
        <template v-slot:label>Idade</template>
        <template v-slot:value>{{ simulationRetirementOption.age.time.timeText }}</template>
      </AppLabelValue>
      <AppLabelValue>
        <template v-slot:label>Tempo de contribuição</template>
        <template v-slot:value>{{ simulationRetirementOption.contributionTime.time.timeText }}</template>
      </AppLabelValue>
      <AppLabelValue>
        <template v-slot:label>Tempo de contribuição</template>
        <template v-slot:value>{{ simulationRetirementOption.contributionTime.time.timeText }}</template>
      </AppLabelValue>
      <AppLabelValue>
        <template v-slot:label>Quantidade de contribuições</template>
        <template v-slot:value>{{ simulationRetirementOption.contributionsTotal }}</template>
      </AppLabelValue>
    </div>
    <!-- REQUIREMENTS RESULT -->
    <div class="w-full flex flex-col">
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
      <AppButton 
        bg="bg-slate-300" 
        @click="emitter.emit('openDrawer', { component: 'SimulationRetirementOptionDetailDrawer', payload: simulationRetirementOption })">
          Ver cálculo
      </AppButton>
    </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    simulationRetirementOption: Object,
  })
  
</script>