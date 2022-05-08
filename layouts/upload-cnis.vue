<template>

  <div>
    <Head>
      <Title>Direito Previdênciário</Title>
      <Meta name="description" content="Titulo" />
    </Head>
    <div class="w-screen h-screen bg-gradient-to-br from-stone-900 to-stone-700 overflow-y-auto p-12 scrolling-touch text-white" style="-webkit-overflow-scrolling: touch;">

      <div class="w-full flex flex-col items-center justify-center">
        <h1 class="text-white text-4xl font-bold">Direito Previdenciário</h1>
      </div>

      <slot />

    </div>
  </div>
</template>

<script setup>
  import '@/assets/main.css'
</script>
