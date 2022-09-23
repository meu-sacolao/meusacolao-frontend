<template>
  <div class="w-full flex flex-col mt-2">
    <div class="flex items-center">
      <input :id="id" type="checkbox" v-model="childValue" class="
        flex-none 
        w-6 
        h-6
        bg-cyan-800
        text-cyan-900
        bg-gray-100
        rounded
        border-gray-300
        focus:ring-cyan-600
        dark:focus:ring-cyan-600
        dark:ring-offset-gray-800
        focus:ring-2
        dark:bg-gray-700
        dark:border-gray-600
      ">
      <label :for="id" class="ml-2 font-medium dark:text-gray-300">
        <slot />
      </label>
    </div>
    <p class="text-red-600 h-4" v-if="hasError">
      <slot name="error"/>
    </p>
  </div>
</template>

<script setup>

  import generateRandomString from '@/util/functions/generateRandomString'
  const { emit } = getCurrentInstance()

  const props = defineProps({
    label: String,
    value: Boolean,
    hasError: {
      type: Boolean,
      default: false
    }
  })

  const id = ref(generateRandomString(10))

  const childValue = computed({
    get() {
      return props.value
    },
    set(val) {
      emit('update:value', val)
    }
  })


</script>

<style lang="scss">
  .checkbox-input {
    @apply appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer;
  }
</style>