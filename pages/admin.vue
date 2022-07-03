<template>
  <NuxtLayout name="main-app">
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["auth-admin"]
})
</script>