<template>
  <ClientOnly>
    <div class="w-full flex justify-between shadow hover:shadow-md p-3 px-4 my-4 font-medium" :class="getAlertTypeInfo.wrapperClass">
      <slot></slot>
      <AppIcons
        :icon="getAlertTypeInfo.icon"
      />
    </div>
  </ClientOnly>
</template>

<script setup>

  const props = defineProps({
    type: {
      default: 'info'
    }
  })

  const getAlertTypeInfo = computed(() => {
    if(props.type == 'error') return {
      wrapperClass: 'bg-red-900/10 border border-red-900/10 text-red-900',
      icon: 'report'
    }

    if(props.type == 'warning') return {
      wrapperClass: 'bg-amber-600/20 border border-amber-600/20 text-amber-600',
      icon: 'warning'
    }

    return {
      wrapperClass: 'bg-cyan-900/20 border border-cyan-900/20 text-cyan-900',
      icon: 'info'
    }
  })


</script>