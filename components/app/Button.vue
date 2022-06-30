<template>
  <button 
    class="px-3 py-2 flex items-center justify-center"
    :class="[bg, text]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
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