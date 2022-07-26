<template>

  <div class="w-full flex flex-col -mt-24" >
    <!-- HOME INTRO -->
    <div class="w-full h-screen block shrink-0 flex flex-col justify-center bg-cyan-800" id="home-intro">
      <div class="app-intro flex flex-wrap">

        <div class="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-end px-10 lg:px-0 text-white text-center lg:text-right space-y-3">
          <h1 class="h1 font-medium">Cálculo e Previdência</h1>
          <h4 class="h4 font-normal">
            A maneira mais <span class="text-amber-500 text-xl lg:text-2xl">rápida</span> 
            e <span class="text-amber-500 text-xl lg:text-2xl">segura</span> 
            de calcular sua aposentadoria sem burocracia!
          </h4>

          <NuxtLink to="/calcule-sua-aposentadoria">
            <AppButton class="bg-amber-600 text-white rounded-full px-6">
              Simule gratuitamente
            </AppButton>
          </NuxtLink>
        </div>

        <div class="w-full lg:w-2/3 flex items-center justify-center ">
          <img class="w-full" src="/images/general/pack-illustrations/01.svg" />
        </div>

      </div>
    </div>

    <div class="w-full flex-none p-20 bg-white h-screen">
    </div>
  </div>
</template>

<script setup>

  import { useAuthStore } from "@/modules/auth/store"
  const authStore = useAuthStore()
  const route = useRoute()

  if(process.client) {
    onMounted(() => {
      if (route.query.code) {
        authStore.googleLogin(route.query.code)
          .then(() => {
            alert('Logado com sucesso com google')
          })
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
