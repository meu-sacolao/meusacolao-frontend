<template>
  <teleport to="body">
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
          p-4
          md:p-6
          lg:p-8
          xl:p-12
          overflow-y-auto
        "
      >
        <!-- MODEL DIALOG -->
        <div :class="[dialogClasses]" class="
          bg-white
          shadow
          p-6
          md:p-6
          lg:p-8
          xl:p-12
          relative
          my-auto
          transition-fade-inner
        " v-if="show">
          <button
            v-if="allowClose"
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
          <div class="w-full mt-8">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>

const { emit } = getCurrentInstance()

  defineEmits(['close', 'open'])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    dialogClasses: {
      type: String,
      default: 'w-full max-w-2xl'
    },
    allowClose: {
      type: Boolean,
      default: true
    }
  })

  const close = () => {
    emit('close')
  }

  watch(() => props.show, (newValue) => {
    if(newValue) {
      emit('open')
      document.addEventListener("keyup", handleEsc)
    } else {
      document.removeEventListener("keyup", handleEsc)
    }
  })

  const handleEsc = (event) => {
    if (props.allowClose && props.show && event.keyCode === 27) close()
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
