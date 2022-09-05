<template>
  <div class="w-full flex space-x-2 my-2 mb-4">
    <AppInputWithIcon 
      v-model:value="childValue" 
      icon="search"
      :label="label"
      :placeholder="placeholder || label" 
      @keydown.enter="search()"
    />
    <AppButton class="bg-brand-gradient mt-2 text-white" @click="search()">
      <AppIcons icon="search" />
    </AppButton>
  </div>
</template>

<script setup>

  import { getCurrentInstance } from 'vue'

  const { emit } = getCurrentInstance()

  defineEmits(['update:search', 'search'])

  const childValue = computed({
    set(search) {
      emit('update:search', search)
    },
    get() {
      return props.search
    }
  })

  const props = defineProps({
    search: String,
    label: String,
    placeholder: String,
    searchTitle: {
      type: String,
      default: 'Procurar'
    }
  })

  const search = () => {
    emit('search')
  }

</script>