<template>
  <!-- HOME INTRO -->
  <div class="w-full h-screen block shrink-0 flex flex-col justify-center bg-cyan-800 relative" id="home-intro">
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
            Simule agora
          </AppButton>
        </NuxtLink>
      </div>

      <div class="w-full lg:w-2/3 flex items-center justify-center ">
        <img class="w-full" src="/images/general/pack-illustrations/01.svg" />
      </div>

      <AppButton
        @click="goToArticles()"
        class="bg-slate-100/40 rounded-full py-10 absolute right-0 bottom-0 mr-6 mb-6 xl:mr-10 xl:mb-10"
      >
        <AppIcons icon="arrow_downward" color="text-slate-700" size="32" />
      </AppButton>

    </div>
  </div>
</template>

<script setup>

  const goToArticles = () => {
      var scrollTo = document.getElementById("home-articles").offsetTop
      document.getElementById('body').scrollTo({
        top: scrollTo - 120,
        left: 0,
        behavior: 'smooth'
      })
  }

</script>