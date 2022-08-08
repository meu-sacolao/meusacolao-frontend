<template>
  <button 
    :class="[classes, bg, text]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    classes: {
      type: String,
      default: 'px-3 py-2 flex items-center justify-center'
    },
    bg: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style>