<template>
  
  <div class="w-full flex justify-center space-x-4 mt-2">
    <AppButton @click="prev()" :disabled="skip < 1">
      <AppIcons icon="chevron_left" />
      <span>Anterior</span>
    </AppButton>
    <AppButton @click="next()" :disabled="limit > length">
      <span>Próximo</span>
      <AppIcons icon="chevron_right" />
    </AppButton>
  </div>
</template>

<script setup>

  import { getCurrentInstance } from 'vue'

  const { emit } = getCurrentInstance()

  defineEmits(['update:skip', 'change'])
  
  const props = defineProps({
    skip: Number,
    limit: Number,
    length: Number,
  })

  const next = () => {
    const newOffset = props.skip + (props.limit)
    emit('update:skip', newOffset)
    emit('change')
  }

  const prev = () => {
    if(props.skip <= 0) return false
    const newOffset = props.skip - props.limit
    emit('update:skip', newOffset)
    emit('change')
  }


</script>