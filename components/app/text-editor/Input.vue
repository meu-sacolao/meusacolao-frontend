<template>
  <div class="block">
    <label class="block mb-2" v-if="label">
      <span class="border-b-4 border-zinc-200 ">{{ label }}</span>
    </label>
    <div 
      :id="id"
      :style="{'--pell-content-height': height + 'px' }"
      class="pell mb-2 focus:shadow-sm hover:shadow"
      :class="{ 'border-red-600': hasError }"
    ></div>
    <p class="text-red-600 h-4" v-if="hasError">
      <slot />
    </p>
  </div>
</template>

<script setup>
  import pell from 'pell'
  import pellActions from './pellActions'
  import sanitizeHtml from './sanitizeHtml'
  import unescape from './unescape'
  import generateRandomString from '@/util/functions/generateRandomString'

  const id = ref(generateRandomString(10))
  const { emit } = getCurrentInstance()

  defineEmits(['update:value'])

  const props = defineProps({
    label: String,
    value: String,
    height: {
      type: String,
      default: '300'
    },
    hasError: {
      type: Boolean,
      default: false
    }
  })

  onMounted(() => {
    setTimeout(() => {
      pellInit()
    }, 500)
  })

  const getPeelHeightClass = computed(() => {
    return `pell-height-${props.height}`
  })

  const pellInit = () => {
    const editor = pell.init({
      element: document.getElementById(id.value),
      onChange: (html) => {
        html = unescape(html)

        let clean = sanitizeHtml(html)

        emit("update:value", clean)
      },
      actions: pellActions,
    })
    editor.content.innerHTML = props.value
  }

</script>


<style lang="scss">
  .pell-actionbar {
    padding: 12px;
    background-color: #FFF;
  }

  .pell-content {
    padding: 16px !important;
    background-color: #FFF;
  }

  .pell {
    border: 1px solid #e2e8f0;
    border-radius: 0;
    box-shadow: none;
  }

  .pell-content {
    height: var(--pell-content-height) !important;
  }

</style>
