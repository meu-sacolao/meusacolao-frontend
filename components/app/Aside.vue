<template>

  <transition name="fade">
    <div 
      v-if="showMenu"
      @click="toggleDrawer()"
      class="w-screen h-screen fixed inset-0 bg-slate-800 bg-opacity-50 mt-24"
    ></div>
  </transition>
  <transition
    enter-active-class="translate-x-full"
    enter-class=""
    enter-to-class=""
    leave-active-class=""
    leave-class=""
    leave-to-class="translate-x-full"
    mode="out-in"
  >
    <aside 
      v-if="showMenu" 
      ref="baseDrawer"
      class="base-aside-dialog transition-all duration-200 easy-in-out transform bg-brand-gradient"
    >
      <AppButton @click.prevent="emitter.emit('openModal', { component: 'AuthForm' })" bg="bg-slate-700" text="text-white">
        Login
      </AppButton>
    </aside>
  </transition>
</template>

<script>
export default {
  name: 'Aside',
  props: ['showMenu'],
  expose: ['toggleDrawer'],
  emits: ['update:showMenu'],
  methods: {

    toggleDrawer() {
      if(!this.showMenu) {
        this.addListeners()
      } else {
        this.removeListeners()
      }
      this.$emit('update:showMenu', !this.showMenu)
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
      if (this.showMenu && evt.keyCode === 27) this.toggleDrawer()
    },

    handleClickOutside(event) {
      if (!(this.$refs['aside'] == event.target || this.$refs['aside'].contains(event.target))) {
        this.toggleDrawer()
      }
    }
    
  }
}
</script>

<style lang="scss">
  .base-aside-dialog {
    @apply mt-24 p-10 fixed top-0 right-0 h-screen w-full shadow-lg flex flex-col z-50 overflow-hidden 
  }

  @media (min-width: 576px) {
    .base-aside-dialog {
      @apply min-w-xl max-w-xl;
    }
  }
</style>
