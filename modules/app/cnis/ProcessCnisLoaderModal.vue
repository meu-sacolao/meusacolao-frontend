<template>
  <AppBaseModal :show="showModal" @close="close" :allowClose="false">
    <div class="w-full flex flex-col items-center space-y-6">
      <img class="w-1/2" src="/images/general/calculating.png" />
      
      <h5 class="h5 text-center">Aguarde alguns instantes enquanto processamos seu arquivo CNIS.</h5>
    </div>
  </AppBaseModal>
</template>

<script setup>
  import { getCurrentInstance } from 'vue'

  const { emit } = getCurrentInstance()

  defineEmits(['close'])

  const props = defineProps({
    showModal: Boolean
  })

  const close = () => {
    emit('close')
  }

</script>
