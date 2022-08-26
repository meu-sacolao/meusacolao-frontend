<template>
  <AppBaseModal :show="showAuthModal" @close="close">
    <AuthForm @close="close" />
  </AppBaseModal>
</template>

<script setup>
  import AuthForm from '@/modules/auth/AuthForm.vue'
  import { getCurrentInstance } from 'vue'

  const { emit } = getCurrentInstance()

  defineEmits(['close'])

  const props = defineProps({
    showAuthModal: Boolean
  })

  const close = () => {
    emit('close')
  }

</script>
