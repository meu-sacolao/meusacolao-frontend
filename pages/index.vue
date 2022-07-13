<template>

  <div class="w-full flex flex-col absolute -mt-24" >
    <!-- HOME INTRO -->
    <div class="w-full h-screen block shrink-0 flex flex-col justify-center bg-brand-gradient" id="home-intro">
      <div class="app-intro flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col items-center justify-center text-white text-right">
          <h2 class="h2">Calcule sua aposentadoria</h2>
          <h4>Rapidez e segurança</h4>
          <p>Calcular sua aposentadoria nunca foi tão fácil</p>
        </div>
        <div class="w-full md:w-1/2 flex items-center justify-center ">
          <img src="/images/general/pack-illustrations/01.svg" width="80%" />
        </div>
      </div>
    </div>

    <div class="w-full flex-none p-20 bg-white h-screen">
    </div>
  </div>
</template>

<script setup>


  if(process.client) {

    const body = document.getElementById('body')
    const pageHeader = document.getElementById('page-header')

    const handleBodyScrollToHome = (event) => {
      const homeIntro = document.getElementById('home-intro')
      if (homeIntro && pageHeader) {
        if(body.scrollTop > (homeIntro.clientHeight - pageHeader.clientHeight)) {
          pageHeader.classList.add('intro-scrolled')
        } else {
          pageHeader.classList.remove('intro-scrolled')
        }
      }
    }

    onMounted(() => {
      if(body) body.addEventListener('scroll', handleBodyScrollToHome)
    })

    onBeforeUnmount(() => {
      if(body) body.removeEventListener('scroll', handleBodyScrollToHome)
    })

  }
  
</script>

<style lang="scss">

  .app-intro {
    height: 60vh;
    padding: 24px;
    
  }

  
</style>
