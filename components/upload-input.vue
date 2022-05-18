<template>
  <div class="w-full block">
    <label
      class="w-full p-8 px-6 border-4 box-border border-dashed border-yellow-600 rounded block flex items-center justify-center text-zinc-900 relative text-lg"
      :class="[
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        modelValue?.name ? 'bg-amber-400' : 'bg-white',
      ]"
    >

      <Icons icon="file_upload" class="mr-2 text-blue flex-shrink-0 block" />
      <span class="whitespace-no-wrap ellipsis block" :class="modelValue && modelValue.name ? 'text-black font-bold' : ''">{{ modelValue.name ? modelValue.name : placeholder }}</span>
      <input
        tabindex="0"
        type="file"
        class="hidden-input-file"
        :accept="accept"
        :disabled="disabled"
        @change="addFile($event)"
        name="file"
        :data-title="placeholder"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'Inputfile',
  props: {
    modelValue: {
      type: [Object, String],
      default() {
        return {
          name: '',
          type: ''
        }
      }
    },
    accept: {
      type: String,
      default: 'image/jpeg, image/png'
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
      default: 'Clique para selecionar ou arraste o arquivo aqui'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      fileName: ''
    }
  },
  methods: {
    addFile(event) {
   
      if (event.target.files && event.target.files[0]) {
        // console.log(event.target.files[0])
        this.$emit('update:modelValue', event.target.files[0]) 
        // this.$emit('updated')
      }
    }
  }
}
</script>

<style>

.hidden-input-file {
  opacity: 0 !important;
  /* z-index: -1; */
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
</style>