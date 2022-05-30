<template>
  <button 
    class="px-3 py-2 flex items-center justify-center"
    :class="[bg, text]"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: ['bg', 'text', 'disabled']
}
</script>
