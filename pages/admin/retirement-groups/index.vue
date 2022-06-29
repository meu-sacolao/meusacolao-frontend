<template>
  <div class="w-full flex flex-col">
    <AppTitle>Grupos de aposentadoria</AppTitle>

    <div class="mt-6">
      <AppTextEditorInput input_id="retirement-group-editor" v-model:value="result" />
    </div>

    <div v-html="result"></div>
  </div>

</template>

<script setup>

  const result = ref('')
</script>
