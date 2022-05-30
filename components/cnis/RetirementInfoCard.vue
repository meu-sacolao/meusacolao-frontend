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
          <template v-slot:label>retirementFactor</template>
          <template v-slot:value>{{ cnisParsedData.retirementFactor }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>avgMajor80Percent</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.avgMajor80Percent) }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>avgAllContributions</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.avgAllContributions) }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>withAliquot70</template>
          <template v-slot:value>{{ vueNumberFormat(cnisParsedData.withAliquot70) }}</template>
        </LabelValue>
        <LabelValue class="four-cols-breakdown mt-6">
          <template v-slot:label>withAliquot60</template>
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

Date = obj?.retirementDate || ''
this.lifeExpectationValue = obj?.lifeExpectationValue || 0
this.retirementFactor = obj?.retirementFactor || 0
this.ageOnRetirementDate = obj?.ageOnRetirementDate || 0
this.contributionTimeInDays = obj?.contributionTimeInDays || 0
this.contributionTimeInMonths = obj?.contributionTimeInMonths || 0
this.contributionTimeInYears = obj?.contributionTimeInYears || 0
this.contributionTimeString = obj?.contributionTimeString || ''
this.avgMajor80Percent = obj?.avgMajor80Percent || 0
this.avgAllContributions = obj?.avgAllContributions || 0
this.withAliquot70 = obj?.withAliquot70 || 0
this.withAliquot60 = obj?.withAliquot60 || 0
this.avgAllWithRetirementFactor = obj?.avgAllWithRetirementFactor || 0