<template>
  <NuxtLayout name="main-app">
    <ProcessCnisFile />
  </NuxtLayout>
</template>

<script>
import ProcessCnisFile from '@/modules/app/cnis/ProcessCnisFile'
export default {
  name: 'PageCnis',
  components: { ProcessCnisFile }
}
</script>
