<template>

  <div class="
    min-h-container 
    w-full
    mt-24
    flex 
    flex-col
    overflow-y-auto
    overflow-x-hidden
    scrolling-touch
  "
  :class="layoutSpacesClasses"
  >
    <slot />
  </div>
</template>

<script setup>

  const route = useRoute()

  // Timeout para evitar que quebra / pulo entre as transições de pagina
  const nonSpacingRoutes = ['/']
  const nonSpacingClasses = ''
  const spacingClasses = 'p-12 px-6 lg:px-20 xl:px-40 2xl:px-72'

  const layoutSpacesClasses = ref(nonSpacingRoutes.includes(route.path) ? nonSpacingClasses : spacingClasses)
  
  watch(() => route.path, (newValue) => {
    setTimeout(() => {
      layoutSpacesClasses.value = newValue === '/' ? nonSpacingClasses : spacingClasses
    }, 300)
  })

</script>