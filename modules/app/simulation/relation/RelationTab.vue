<template>

  <div class="w-full p-6 flex flex-col space-y-6">
    <RelationCard
      v-for="(socialSecurityRelation, index) in simulation.socialSecurityRelations"
      :key="`simulation-social-security-${index}`"
      :socialSecurityRelation="socialSecurityRelation"
    ></RelationCard>
  </div>

</template>

<script setup>

  import RelationCard from '@/modules/app/simulation/relation/RelationCard'
  
  defineProps({
    simulation: Object
  })

</script>