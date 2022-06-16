<template>
  <transition name="fade" :duration="550">
    <div
      v-if="show"
      class="
        fixed
        inset-0
        bg-slate-800/70
        flex
        items-center
        justify-center
        z-50
        p-12
        overflow-y-auto
      "
    >

      <div :class="[dialogClasses]" class="bg-white shadow p-10 relative my-auto transition-fade-inner" v-if="show">
        <button
          @click="close()"
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
        <div class="w-full">
          <component v-if="component" :is="component" :payload="payload"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseModal",
  data() {
    return {
      show: false,
      dialogClasses: 'w-full max-w-2xl',
      component: null,
      payload: null,
    };
  },
  mounted() {
    this.emitter.on('openModal', this.open)
  },
  beforeDestroy() {
    this.emitter.off('openModal')
  },
  methods: {

    open({ component, payload }) {
      this.component = component
      this.payload = payload
      this.show = true
      this.addListeners()
    },

    close() {
      this.show = false
      this.removeListeners()
    },

    addListeners() {
      document.addEventListener("keyup", this.handleEsc)
    },

    removeListeners() {
      document.removeEventListener("keyup", this.handleEsc)
    },

    handleEsc(evt) {
      if (this.show && evt.keyCode === 27) this.close()
    },
  },
}
</script>

<style scoped>

  .fade-enter-active .transition-fade-inner,
  .fade-leave-active .transition-fade-inner {
    transition: all 0.3s ease-in-out;
  }

  .fade-leave-active {
    transition-delay: 0.15s;
  }

  .fade-enter-from .transition-fade-inner,
  .fade-leave-to .transition-fade-inner {
    transform: translateY(30px);
    opacity: 0;
  }
</style>
