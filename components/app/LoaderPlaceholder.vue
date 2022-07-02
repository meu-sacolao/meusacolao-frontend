<template>
  <ClientOnly>
    <div class="w-full flex flex-col">
      <div 
        class="w-full bg-zinc-200"
        :class="classes"
        v-for="(i, index) in quantity"
        :key="`loader-placeholder-${index}`"
      >
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
  defineProps({
    quantity: {
      default: 1
    },
    classes: {
      default: 'h-32'
    }
  })
</script>