<template>
  <!-- HOME INTRO -->
  <div class="w-full h-screen-view block shrink-0 flex flex-wrap justify-center bg-cyan-800 relative mt-24" id="home-intro">
      <div class="w-full h-1/2 lg:h-full lg:w-1/2 flex flex-col justify-center items-center lg:items-end p-10 text-white text-center lg:text-right space-y-3">
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

      <div class="w-full block h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center">
        <img class="app-intro-image" src="/images/general/pack-illustrations/01.svg" />
      </div>

      <AppButton
        @click="goToArticles()"
        class="bg-slate-100/40 rounded-full py-10 absolute right-0 bottom-0 mr-6 mb-6 xl:mr-10 xl:mb-10"
      >
        <AppIcons icon="arrow_downward" color="text-slate-700" size="32" />
      </AppButton>
    <div class=" flex flex-wrap h-full">


    </div>
  </div>
</template>

<script setup>

  const goToArticles = () => {
      var scrollTo = document.getElementById("home-articles").offsetTop
      document.getElementById('body').scrollTo({
        top: scrollTo - 180,
        left: 0,
        behavior: 'smooth'
      })
  }

</script>

<style lang="scss">

  .app-intro {
    height: 60vh;
    padding: 24px;
  }

  .app-intro-image {
    height: 100%;
    width: auto;
    aspect-ratio: attr(width) / attr(height);
  }
</style>