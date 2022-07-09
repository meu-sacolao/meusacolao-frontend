<template>

  <div class="overflow-x-auto">
    <table class="table-auto w-full whitespace-nowrap">
      <thead>
        <tr>
          <th>Competência</th>
          <th>Valor base</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(contribution, index) in contributions"
          :key="`contribution_${ index }`"  
        >
          <td>{{ contribution.monthReference }}</td>
          <td>{{ vueNumberFormat(contribution.baseValue) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

  defineProps({
    contributions: Array
  })

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