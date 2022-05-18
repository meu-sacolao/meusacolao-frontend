<template>
  <div class="w-full block shadow-lg bg-white border border-slate-100 flex border-box">

    <div :class="border" class="h-full block"></div>
    <div :class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    border: {
      type: String,
      default: 'w-3 bg-orange-400'
    },
    content: {
      type: String,
      default: 'p-8'
    }
  }
}
</script>