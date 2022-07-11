<template>

  <div id="main-content" class="w-screen h-screen font-sans bg-slate-100 text-zinc-700 overflow-x-hidden scrolling-touch" style="-webkit-overflow-scrolling: touch;">
    <AppPageHeader></AppPageHeader>
    <NuxtLayout>

      <div class="h-container flex flex-col space-y-4 items-center justify-center">
        <h1 class="h1">{{ error.statusCode }}</h1>
        <p class="p">{{ error.message }}</p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>

  const error = useError()
</script>