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
  const spacingClasses = 'p-12 px-6 md:px-20 xl:px-28'

  const layoutSpacesClasses = ref(nonSpacingRoutes.includes(route.path) ? nonSpacingClasses : spacingClasses)
  
  watch(() => route.path, (newValue) => {
    if(newValue === '/') {
      setTimeout(() => {
        layoutSpacesClasses.value = nonSpacingClasses
      }, 300)
    } else {
      setTimeout(() => {
        layoutSpacesClasses.value = spacingClasses
      }, 300)
    }
  })

</script>