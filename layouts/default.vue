<template>
  <div class="w-full flex flex-col">
    <slot />
  </div>
</template>

<script setup>
// This compiler macro works in both <script> and <script setup>
const route = useRoute()
definePageMeta({
  // you can also pass a string or a computed property
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