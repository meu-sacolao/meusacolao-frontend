<template>
  <div class="w-full block shadow hover:shadow-lg transition-shadow ease-in-out duration-300 bg-white border border-slate-100 flex flex-stratch border-box">

    <div :class="border" class="grow block flex-none"></div>

    <div class="w-full flex flex-col">
      <div :class="header" class="w-full flex flex-col">
        <slot name="header"></slot>
      </div>
      <Transition name="fade">
        <div :class="content" class="w-full flex flex-col" v-if="$slots.content">
          <slot name="content"></slot>
        </div>
      </Transition>
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
    header: {
      type: String,
      default: 'p-6 w-full border-b border-slate-100'
    },
    content: {
      type: String,
      default: 'p-6 w-full'
    },
  }
}
</script>