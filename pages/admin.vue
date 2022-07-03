<template>
  <div class="">
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth-admin"]
})
</script>