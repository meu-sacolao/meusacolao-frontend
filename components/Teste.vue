<template>
  <div class="w-full h-8 bg-red-500 block text-white">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'asd'
    }
  }
}
</script>

<style>

</style>