<template>
  <div class="w-full h-screen flex items-center justify-center flex-col">
    <img src="/images/logo/1x/LOGO_2_1x.png" width="420px" />
    <h1 class="h1 text-cyan-900">Em breve</h1>
  </div>
</template>

<script setup>
// This compiler macro works in both <script> and <script setup>
const route = useRoute()
definePageMeta({
  // you can also pass a string or a computed property
  key: route => route.slug,
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
})
</script>
