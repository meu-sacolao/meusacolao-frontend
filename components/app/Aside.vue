<template>
  <aside 
    ref="aside"
    class="mt-24 fixed top-0 right-0 w-full translate-x-full lg:max-w-lg p-12 transition-all duration-300 easy-in-out h-screen bg-brand-grandient overflow-hidden flex items-start justify-center"
    :class="[menuIsOpen ? '-translate-x-0' : '']"
  >
    <AppButton @click.prevent="emitter.emit('openModal')" bg="bg-slate-700" text="text-white">
      Login
    </AppButton>
  </aside>
</template>

<script>
export default {
  name: 'Aside',
  props: ['menuIsOpen'],
  expose: ['toggleDrawer'],
  emits: ['update:menuIsOpen'],
  methods: {

    toggleDrawer() {
      if(!this.menuIsOpen) {
        this.addListeners()
      } else {
        this.removeListeners()
      }
      this.$emit('update:menuIsOpen', !this.menuIsOpen)
    },

    addListeners() {
      document.addEventListener("click", this.handleClickOutside)
      document.addEventListener("keyup", this.handleEsc)
    },

    removeListeners() {
      document.removeEventListener("click", this.handleClickOutside)
      document.removeEventListener("keyup", this.handleEsc)
    },

    handleEsc(evt) {
      if (this.menuIsOpen && evt.keyCode === 27) this.toggleDrawer()
    },

    handleClickOutside(event) {
      if (!(this.$refs['aside'] == event.target || this.$refs['aside'].contains(event.target))) {
        this.toggleDrawer()
      }
    }
    
  }
}
</script>
