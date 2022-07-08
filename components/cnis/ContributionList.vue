<template>

  <div class="overflow-x-auto">
    <table class="table-auto w-full whitespace-nowrap">
      <thead>
        <tr>
          <th>Competência</th>
          <th>Valor cnis</th>
          <th>Valor pós limite</th>
          <th>Valor pós correção</th>
          <th>Valor final</th>
          <th>É maior que o limite</th>
          <th>É menor que o mín.</th>
          <th>É antes de Jul/94</th>
          <th>É depois da reforma de 2019</th>
          <th>É maior que 80%</th>
          <th>Ignorado?</th>
          <th>Motivo</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(contribution, index) in contributions"
          :key="`contribution_${ index }`"  
        >
          <td>{{ contribution.monthReference }}</td>
          <td>{{ vueNumberFormat(contribution.baseValue) }}</td>
          <td>
            <span>{{ vueNumberFormat(contribution.valueAfterCheckLimit) }}</span>
            <span class="ml-2" v-if="contribution.contributionLimit">(Lim: {{  vueNumberFormat(contribution.contributionLimit.contributionLimit) }})</span>
          </td>
          <td>
            <span>{{ vueNumberFormat(contribution.valueAfterCorrection) }}</span>
            <span class="ml-2" v-if="contribution.indexCorrection">(Índice: {{ contribution.indexCorrection }})</span>
          </td>
          <td>{{ vueNumberFormat(contribution.finalValue) }}</td>
          <td><AppBooleanLabel v-model:value="contribution.isMoreThanLimit" /></td>
          <td><AppBooleanLabel v-model:value="contribution.isLessThanMinimum" /></td>
          <td><AppBooleanLabel v-model:value="contribution.isBeforeJuly1994" /></td>
          <td><AppBooleanLabel v-model:value="contribution.isAfterReform2019" /></td>
          <td><AppBooleanLabel v-model:value="contribution.isMajor80ThanPercent" /></td>
          <td><AppBooleanLabel v-model:value="contribution.isIgnored" /></td>
          <td>{{ contribution.ignoredReason }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LabelValue from '@/components/app/LabelValue.vue'
export default {
    name: "ContributionList",
    props: {
      contributions: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        showContent: false
      }
    },
    mounted() {
      console.log(this)
    },
    methods: {
      toggleCard() {
        showContent = !showContent;
      }
    },
    components: { LabelValue }
}
</script>

<style lang="scss">
  table {
    th {
      @apply p-3 bg-gray-100 text-left border-b;
    }

    td {
      @apply p-3 bg-gray-50;
    }

    tbody {
      tr {
        @apply hover:border-b border-slate-100 box-content
      }
    }
  }
</style>