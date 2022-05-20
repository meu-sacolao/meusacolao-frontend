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
          <th>Ordem vinculo</th>
          <th>Ordem contr.</th>
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
            <span class="ml-2" v-if="contribution.indexCorrection">(Fator: {{ contribution.indexCorrection }})</span>
          </td>
          <td>{{ vueNumberFormat(contribution.finalValue) }}</td>
          <td>{{ contribution.indexSocialSecurityRelation }}</td>
          <td>{{ contribution.indexContribution }}</td>
          <td>{{ contribution.isIgnored }}</td>
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
        this.showContent = !this.showContent;
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