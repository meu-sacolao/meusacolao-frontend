<template>
  <NuxtLayout name="main-app">
    <ProcessCnisFile />
  </NuxtLayout>
</template>

<script setup>
  import ProcessCnisFile from '@/modules/app/cnis/ProcessCnisFile'

  useHead({
    title: 'Simule sua aposentadoria - Cálculo e Previdência',
  })

</script>
