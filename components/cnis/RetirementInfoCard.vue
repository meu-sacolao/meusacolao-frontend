<template>
  <AppCard>
    <template v-slot:header>
      <div class="w-full flex flex-wrap justify-start mt-4">
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Data aposentadoria</template>
          <template v-slot:value>{{ cnisParsedData.retirementDate }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Tempo de contribuição total</template>
          <template v-slot:value>{{ cnisParsedData.contributionTimeString }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Expectativa de vida</template>
          <template v-slot:value>{{ cnisParsedData.lifeExpectationValue }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Idade na data da aposentadoria</template>
          <template v-slot:value>{{ cnisParsedData.ageOnRetirementDate }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Fator Previdenciário</template>
          <template v-slot:value>{{ cnisParsedData.retirementFactor }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Média dos 80% maiores salários</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.avgMajor80Percent) }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Média de todas as contribuições</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.avgAllContributions) }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Valor calculado com Alíquota de 70%</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.withAliquot70) }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>Valor calculado com Alíquota de 60%</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.withAliquot60) }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>avgAllWithRetirementFactor</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.avgAllWithRetirementFactor) }}</template>
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
      this.showContent = !this.showContent;
    }
  },
  components: { LabelValue }
}
</script>