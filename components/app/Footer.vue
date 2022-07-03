<template>
  
  <div class="w-full flex flex-col p-10 footer bg-brand-gradient">

    <div class="border-b border-slate-500 flex items-center justify-between pb-8">
      <nuxt-link to="/">
        <img src="/images/logo/1x/LOGO_2_1_1x.png" class="h-14" alt="Logo Calculo e previdência"/>
      </nuxt-link>
      <NuxtLink to="/simulacao-de-aposentadoria">
        <AppButton class="hidden sm:block bg-amber-600 text-white rounded-full px-6">
          Simule sua aposentadoria
        </AppButton>
      </NuxtLink> 
    </div>

    <div class="border-b border-slate-500 flex items-start justify-between py-8 text-zinc-200">
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Acesso</h5>
        <ul class="space-y-2 mt-4">
          <li>Home</li>
          <li>Simule sua aposentadoria</li>
          <li>Suas simulações</li>
          <li>Cadastre-se</li>
          <li>Login</li>
        </ul>
      </div>
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Sobre</h5>
        <ul class="space-y-2 mt-4">
          <li>Sobre nós</li>
          <li>Como sua aposentadoria é calculada</li>
        </ul>
      </div>
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Artigos</h5>
        <ul class="space-y-2 mt-4">
          <li>Artigo 1</li>
          <li>Artigo 2</li>
        </ul>
      </div>
      <div class="four-cols-breakdown">
        <h5 class="h5 font-normal">Fale conosco</h5>
        <ul class="space-y-2 mt-4">
          <li>Contato</li>
        </ul>
      </div>
    </div>

    <div class="pt-10 flex justify-between text-zinc-400">

      <div class="">
        Calculo e Previdência - CNPJ 10.100.100/0001-01
      </div>
      <div class="flex justify-end text-zinc-400 space-x-3 items-center">
        <p class="font-thin italic">Developed by</p>
        <a href="https://igortrindade.dev" target="_blank">
          <img src="/images/partners/logo_igortrindade.png" class="h-8" alt="Logo Igor Trindade"/>
        </a>
        <a href="#" target="_blank">
          Digi3
        </a>
      </div>
    </div>
    
  </div>
</template>

<style lang="scss">

  .footer {
    box-shadow: rgba(0, 0, 0, 0.15) 0px -10px 30px -12px;
    
  }
</style>