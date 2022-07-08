<template>

  <div class="w-full flex flex-col space-y-6">

    <SocialSecurityRelationCard
      v-for="(socialSecurityRelation, index) in simulation.socialSecurityRelations"
      :key="`simulation-social-security-${index}`"
      :socialSecurityRelation="socialSecurityRelation"
    ></SocialSecurityRelationCard>
  </div>

</template>

<script setup>

  import SocialSecurityRelationCard from '@/modules/app/simulation/SocialSecurityRelationCard'
  
  defineProps({
    simulation: Object
  })

</script>