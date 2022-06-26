<template>
  <NuxtLayout name="main-app">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["auth-admin"]
})
</script>