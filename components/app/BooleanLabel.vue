<template>
  <span v-if="value">{{ positiveLabel }}</span>
  <span v-else>{{ negativeLabel }}</span>
</template>
<script>
export default {
  name: 'BooleanLabel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    positiveLabel: {
      type: String,
      default: 'Sim'
    },
    negativeLabel: {
      type: String,
      default: 'Não'
    }
  }
}
</script>
