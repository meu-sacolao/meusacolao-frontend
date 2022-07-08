<template>
  <AppCard>
    <template v-slot:header>
      <div class="w-full flex space-x-2 pr-12">
        <h3 class="h3 truncate leading-relaxed ...">Informações do cálculo</h3>
      </div>
    </template>
    <template v-slot:content>
      <div class="w-full flex flex-wrap justify-start">
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Data do cálculo</template>
          <template v-slot:value>{{ cnisParsedData.retirementDate }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Expectativa de vida</template>
          <template v-slot:value>{{ cnisParsedData.lifeExpectationValue }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Idade na data do cálculo</template>
          <template v-slot:value>{{ cnisParsedData.ages.onRetirementDate.fullYears }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Fator Previdenciário</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.retirementFactor, { prefix: '', decimals: ',', precision: 2 }) }}</template>
        </LabelValue>
      </div>
    </template>
  </AppCard>
</template>

<script>
import LabelValue from '@/components/app/LabelValue.vue'
export default {
  name: "CnisRetirementInfoCard",
  props: ["cnisParsedData"],
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    toggleCard() {
      showContent = !showContent;
    }
  },
  components: { LabelValue }
}
</script>