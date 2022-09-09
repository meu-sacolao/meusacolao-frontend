<template>
  <div class="w-full flex flex-wrap p-0 shadow-md bg-cyan-800/5">
    <div class="w-full lg:w-1/2 flex flex-wrap items-center justify-center">
      <img class="w-full -mt-6" src="/images/general/pack-illustrations/19.svg" />
    </div>
    <div class="w-full lg:w-1/2 p-6 flex flex-col justify-center items-start space-y-4">
      <h3 class="h3 text-left">Precisa de orientação?</h3>
      <p class="leading-relaxed">Fale com um analista especializado em aposentadoria gratuitamente.</p>
      <AppButton 
        @click="openContactModal()"
        class="sm:block bg-brand-gradient text-white rounded-full px-8"
      >
        Falar com especialista
      </AppButton>
    </div>
  </div>
</template>

<script setup>
  const emitter = useEmitter()
  const openContactModal = () => {
    emitter.emit('openContactModal')
  }
</script>