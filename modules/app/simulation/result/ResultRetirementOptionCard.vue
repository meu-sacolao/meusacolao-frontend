<template>

  <div class="w-full flex flex-col items-start space-y-4 shadow hover:shadow-md border border-zinc-100 mb-6 p-4 relative bg-zinc-100/20">

    <h3 class="h4 leading-relaxed">{{ simulationRetirementOption.retirementOption.title }}</h3>

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
        <template v-slot:label>Quantidade de contribuições</template>
        <template v-slot:value>{{ simulationRetirementOption.contributionsTotal }}</template>
      </AppLabelValue>
    </div>

    <template v-if="simulationRetirementOption.retirementOption.showForNotLoggedUsers">
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
      
      <LabelIsGranted :isGranted="simulationRetirementOption.isGranted" />

      <div class="flex mt-6">
        <AppButton 
          bg="bg-brand-gradient text-white" 
          @click="emitter.emit('openDrawer', { component: 'SimulationRetirementOptionDetailDrawer', payload: simulationRetirementOption })">
            Ver cálculo
        </AppButton>
      </div>
    </template>

    <template v-else>
      <div class="w-full p-8 bg-zinc-100 shadow flex flex-wrap">
        <p class="p">
          <button 
            @click="emitter.emit('openAuthModal')"
            class="font-bold italic text-blue-500"
          >
            Clique aqui e cadastre-se
          </button> 
          gratuitamente para ver o resultado de sua aposentadoria na 
          <b>{{ simulationRetirementOption.retirementOption.title }}</b>
          .
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>

  import LabelIsGranted from '@/modules/app/simulation/result/LabelIsGranted'
  import emitter from '@/util/emitter'

  const props = defineProps({
    simulationRetirementOption: Object,
  })
  
</script>