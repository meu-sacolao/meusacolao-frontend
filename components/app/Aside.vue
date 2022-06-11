<template>

    <div 
      class="mt-24 fixed top-0 right-0 w-full translate-x-full lg:max-w-lg p-12 transition-all duration-300 easy-in-out h-screen bg-brand-grandient overflow-hidden flex items-start justify-center"
      :class="[menuIsOpen ? '-translate-x-0' : '']"
    >

    asdasd

      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Aside',
  props: ['menuIsOpen'],
  expose: ['toggleDrawer'],
  emits: ['update:menuIsOpen'],
  mounted() {
    document.addEventListener("keyup", this.handleEsc)
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.handleEsc)
  },
  methods: {
    handleEsc(evt) {
      if (this.menuIsOpen && evt.keyCode === 27) this.toggleDrawer()
    },
    toggleDrawer() {
      console.log('Event chegou aqui')
      this.$emit('update:menuIsOpen', !this.menuIsOpen)
    }
  }
}
</script>
