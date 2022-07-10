<template>
  <div class="w-full flex flex-col">
    <slot />

    <!-- MODALS PLACEHOLDER -->
    <AuthFormModalVue />
  </div>

</template>

<script setup>

  import AuthFormModalVue from '@/modules/auth/AuthFormModal.vue';
  const route = useRoute()

  definePageMeta({
    key: route => route.path,
    layoutTransition: {
      name: 'foobar',
      mode: 'out-in',
      duration: 500
    },
  })

</script>

<style>

.page-enter-from{
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>