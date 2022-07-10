<template>

  <div class="overflow-x-auto">
    <table class="table-auto w-full whitespace-nowrap">
      <thead>
        <tr>
          <th>Competência</th>
          <th>Valor base</th>
          <th>Valor base</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(contribution, index) in contributions"
          :key="`contribution_${ index }`"  
        >
          <td>{{ contribution.monthReference }}</td>
          <td>{{ vueNumberFormat(contribution.baseValue) }}</td>
          <td><AppMoneyInput class="w-40" v-model:value="contribution.baseValue" /></td>
          <td>
            <div class="flex ">
              <AppButton class="text-zinc-400 hover:text-orange-600">
                <AppIcons icon="edit" />
              </AppButton>  
              <AppButton class="text-zinc-400 hover:text-orange-600">
                <AppIcons icon="do_not_disturb_on" />
              </AppButton>  
              <AppButton class="text-zinc-400 hover:text-orange-600">
                <AppIcons icon="delete_forever" />
              </AppButton>  
            </div>
          </td>
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
      @apply p-3 bg-gray-100  text-left border-b;
    }

    td {
      @apply p-3  ;
    }

    tbody {
      tr {
        @apply bg-gray-50 hover:bg-gray-100;
      }
    }
  }
</style>