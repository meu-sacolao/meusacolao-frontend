<template>

  <transition name="fade">
    <div 
      v-if="showDrawer"
      @click="closeDrawer()"
      class="w-screen h-screen fixed inset-0 bg-slate-800 bg-opacity-50"
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
    <div 
      v-if="showDrawer" 
      ref="baseDrawer"
      class="origin-right transition-all duration-200 easy-in-out transform fixed top-0 right-0 min-w-xl max-w-full h-screen bg-white shadow-lg flex flex-col z-60 psui-overflow-hidden mt-24"
    >
      <button
        @click="closeDrawer()"
        class="
          absolute
          top-0
          right-0
          text-ash-500
          pr-4
          pt-5
          focus:outline-none
        "
      >
        <AppIcons icon="close" />
      </button>

      <div class="flex flex-col p-10">
        <component v-if="component" :is="component" :payload="payload" />
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseDrawer',
  data() {
    return {
      showDrawer: false,
      component: false,
      payload: null
    }
  },
  mounted() {
    document.addEventListener("keyup", this.handleEsc)
    this.emitter.on('openDrawer', this.openDrawer)
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.handleEsc)
    this.emitter.off('openDrawer')
  },
  methods: {
    handleEsc(evt) {
      if (this.showDrawer && evt.keyCode === 27) this.closeDrawer()
    },
    openDrawer({ component, payload }) {      
      this.component = component
      this.payload = payload
      this.showDrawer = true
    },
    closeDrawer() {
      this.showDrawer = false
      this.component = false
      this.payload = false
    }
  }
}
</script>
