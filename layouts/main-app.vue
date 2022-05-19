<template>

  <div class="w-screen font-sans bg-slate-100 text-zinc-700 overflow-x-hidden scrolling-touch" style="-webkit-overflow-scrolling: touch;">
        
    <div class="h-auto w-full mt-24 p-12 px-6 md:px-20 xl:px-28 overflow-y-auto overflow-x-hidden scrolling-touch">
      <AppPageHeader></AppPageHeader>
      <slot />
    </div>

  </div>
</template>