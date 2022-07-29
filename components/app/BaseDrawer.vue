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
      class="base-drawer-dialog transition-all duration-200 easy-in-out transform"
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
        <AppIcons icon="close" size="32" />
      </button>

      <div class="flex flex-col h-full overflow-y-auto">
        <div class="p-10 mb-24">
          <component v-if="component" :is="component" :payload="payload" />
        </div>
      </div>

    </div>
  </transition>
</template>

<script setup>

    const showDrawer = ref(false)
    const component = ref(false)
    const payload = ref(null)
  
    const openDrawer = ({ component, payload }) => {
      component.value = component
      payload.value = payload
      showDrawer.value = true
    }
  
    const closeDrawer = () => {
      showDrawer.value = false
      component.value = false
      payload.value = null
    }

    if(process.client) {
      const emitter = inject('emitter')
    
      const handleEsc = (evt) => {
        if (showDrawer.value && evt.keyCode === 27) closeDrawer()
      }
    
  
      onMounted(() => {
        document.addEventListener("keyup", handleEsc)
        emitter.on('openDrawer', openDrawer)
      })
    
      onBeforeUnmount(() => {
        document.removeEventListener("keyup", handleEsc)
        emitter.off('openDrawer')
      })
    }
    
  
</script>

<style lang="scss">
  .base-drawer-dialog {
    @apply border fixed top-0 right-0 h-screen w-full bg-white shadow-lg flex flex-col z-50 overflow-hidden mt-24
  }

  @media (min-width: 576px) {
    .base-drawer-dialog {
      @apply min-w-xl max-w-xl;
    }
  }
</style>
