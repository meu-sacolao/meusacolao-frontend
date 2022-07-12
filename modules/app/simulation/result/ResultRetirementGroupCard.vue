<template>
  <AppCard 
    v-if="simulationRetirementGroup.simulationRetirementOptions.length"
    :border="'w-4 hover:bg-orange-400 bg-zinc-100'"
  >
    <template v-slot:header>
      <div class="w-full flex flex-col">
        <h3 class="h3 leading-relaxed ...">{{ simulationRetirementGroup.retirementGroup.title }}</h3>
        <div class="p text-slate-400 leading-relaxed" v-html="simulationRetirementGroup.retirementGroup.content"></div>
      </div>
    </template>
    <template v-slot:content>

      <div class="w-full flex flex-col">
        <div 
          class="w-full flex flex-col shadow mb-4 p-4 relative" 
          v-for="(simulationRetirementOption, index) in simulationRetirementGroup.simulationRetirementOptions" 
          :key="`simulationRetirementOption${index}`"
        >

          <div class="w-full flex flex-wrap mb-4">
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
            <AppButton bg="bg-slate-300" @click="emitter.emit('openDrawer', { component: 'SimulationRetirementOptionDetailDrawer', payload: simulationRetirementOption })">Ver cálculo</AppButton>
          </div>
          
        </div>

      </div>

      <p class="text-lg italic" v-if="isGranted">
        Pelos elementos apresentados, você tem direito à aposentadoria pela regra <b>{{ simulationRetirementGroup.retirementGroup.title }}</b>.
        Fale com o analista previdenciário para orientação sobre requerimento ou planejamento para avaliar a melhor estratégia para sua aposentadoria.
        <span class="font-bold text-blue-600">Fale com o analista!</span>
      </p>
      <p class="text-lg italic" v-else>
        Pelos elementos apresentados, você ainda não tem direito à aposentadoria pela regra <b>{{ simulationRetirementGroup.retirementGroup.title }}</b>.
        Fale com o analista previdenciário para verificar a inclusão de novos tempos, revisão de valores e avaliar a melhor estratégia para sua aposentadoria.
        <span class="font-bold text-blue-600">Fale com o analista!</span>
      </p>
    </template>
  </AppCard>
</template>

<script setup>
  
  const props = defineProps({
    simulationRetirementGroup: Object
  })

  const showContent = ref(false)

  const isGranted = computed(() => {
    return props.simulationRetirementGroup.simulationRetirementOptions.filter((i) => i.isGranted).length > 0
  })

  const toggleCard = () => {
    showContent.value = !showContent.value
  }
</script>