<template>
  
  <AppPill v-if="isGranted" bg="bg-emerald-600" text="text-white">
    <AppIcons icon="check_circle" />
    <span class="ml-2">Direito ao Benefício</span>
  </AppPill>
  <AppPill v-else bg="bg-zinc-300">
    <AppIcons icon="block" />
    <span class="ml-2">Não tem direito ao benefício</span>
  </AppPill>

</template>

<script setup>
  const props = defineProps({
    isGranted: Boolean
  })
</script>