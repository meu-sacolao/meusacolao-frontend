<template>
  <div class="w-screen h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 bg-zinc-800 overflow-y-auto p-12 scrolling-touch text-white" style="-webkit-overflow-scrolling: touch;">

    <div class="w-full flex flex-col items-center justify-center ">
      <h1 class="text-white text-4xl font-bold">Direito Previdenciário</h1>
    </div>

    <slot />

  </div>
</template>

<script setup>
  import '@/assets/main.css'

  useHead({
    title: 'Direito Previdenciário'
  })
  
</script>
