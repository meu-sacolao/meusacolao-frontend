<template>
  <AppBaseModal :show="showContactModal" @close="close">
    
    <div class="flex flex-col space-y-6">

      <h3 class="h3 border-l-10 border-orange-500 pl-6 leading-normal ">
        <span>Fale conosco</span>
      </h3>

      <p class="p">Como você prefere falar com nossos analistas especializados em aposentadoria?</p>

      <div class="w-full flex flex-col space-y-6">

        <div class="w-full flex p-0 shadow-md hover:shadow-lg bg-cyan-800/5">
          <div class="w-1/5 flex flex-wrap items-center justify-center p-4 sm:p-8">
          <img src="/icons/contact/phone.png" />
          </div>
          <div class="w-full p-6 flex flex-col justify-center items-start space-y-4">
            <p class="w-full text-center">Entrar em contato por telefone</p>
          </div>
        </div>
        <div class="w-full flex p-0 shadow-md hover:shadow-lg bg-cyan-800/5">
          <div class="w-1/5 flex flex-wrap items-center justify-center p-4 sm:p-8">
          <img src="/icons/contact/whatsapp.png" />
          </div>
          <div class="w-full p-6 flex flex-col justify-center items-start space-y-4">
            <p class="w-full text-center">Entrar em contato por WhatsApp</p>
          </div>
        </div>
        <div class="w-full flex p-0 shadow-md hover:shadow-lg bg-cyan-800/5">
          <div class="w-1/5 flex flex-wrap items-center justify-center p-4 sm:p-8">
          <img src="/icons/contact/email.png" />
          </div>
          <div class="w-full p-6 flex flex-col justify-center items-start space-y-4">
            <p class="w-full text-center">Entrar em contato por email</p>
          </div>
        </div>

      </div>
    </div>
  </AppBaseModal>
</template>

<script setup>
  
  const emitter = useEmitter()

  const showContactModal = ref(false)

  onMounted(() => {
    emitter.on('openContactModal', () => {
      showContactModal.value = true
    })
  })

  onBeforeUnmount(() => {
    emitter.off('openContactModal')
  })

  const close = () => {
    showContactModal.value = false
  }

</script>
