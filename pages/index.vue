<template>

  <div class="w-full flex flex-col -mt-24" >
    
    <AppHomeIntro />
    <AppHomeArticles />

  </div>
</template>

<script setup>
  import AppHomeIntro from '@/modules/app/home/HomeIntro.vue'
  import AppHomeArticles from '@/modules/app/home/HomeArticles.vue'
  import { useAuthStore } from "@/modules/auth/store"
  const authStore = useAuthStore()
  const route = useRoute()

  if(process.client) {
    
    onMounted(() => {
      if (route.query.googleAuthToken) {
        authStore.googleLogin(route.query.googleAuthToken)
      }
    })

  }
  
</script>

<style lang="scss">

  .app-intro {
    height: 60vh;
    padding: 24px;
    
  }

  
</style>
