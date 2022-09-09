<template>

  <div class="w-full flex flex-col -mt-24" >
    
    <AppHomeIntro />
    <AppHomeArticles />

  </div>
</template>

<script setup>
  import AppHomeIntro from '@/modules/app/home/HomeIntro.vue'
  import AppHomeArticles from '@/modules/app/home/HomeArticles.vue' 
</script>

<style lang="scss">

  .app-intro {
    height: 60vh;
    padding: 24px;
  }

</style>
