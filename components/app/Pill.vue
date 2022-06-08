<template>
  <div 
    class="px-3 py-2 flex items-center justify-center rounded-full"
    :class="[bg, text]"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: ['bg', 'text']
}
</script>
