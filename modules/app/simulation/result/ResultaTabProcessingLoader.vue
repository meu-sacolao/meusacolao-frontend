<template>
  <div class="w-full flex flex-wrap p-8 shadow-md bg-cyan-800/5">
    <div class="w-full lg:w-1/3 p-6 flex flex-col justify-center space-y-4">
      <h3 class="h3 text-left">Processando</h3>
      <p class="leading-relaxed">Aguarde enquanto processamos o resultado de sua aposentadoria.</p>
    </div>
    <div class="w-full lg:w-2/3 flex flex-wrap items-center justify-center">
      <img class="w-full w-1/2 lg:w-3/4" src="/images/general/pack-illustrations/16.svg" />
    </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    simulation: Object
  })

</script>
