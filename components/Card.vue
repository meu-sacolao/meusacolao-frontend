<template>
  <div class="w-full block shadow-lg bg-white border border-slate-100 flex flex-stratch border-box">

    <div :class="border" class="grow bg-orange-400 block flex-none"></div>
    <div :class="content" class="w-full flex flex-col">
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
      default: 'w-4 bg-orange-400'
    },
    content: {
      type: String,
      default: 'p-8 w-full'
    }
  }
}
</script>