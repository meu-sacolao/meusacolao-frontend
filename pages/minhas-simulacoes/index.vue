<template>
  <div>
    <ClientOnly>
      <UserSimulationListVue />
    </ClientOnly>
  </div>
</template>
<script setup>
  import UserSimulationListVue from '@/modules/user/simulation/UserSimulationList.vue'

  useHead({
    title: 'Minhas simulações - ',
  })

</script>