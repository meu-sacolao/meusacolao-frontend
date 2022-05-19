<template>
  
  <div class="flex flex-col">
    <h5 class="h5 text-slate-400 leading-none">
      <slot name="label"></slot>
    </h5>
    <h4 class="h4 leading-relaxed">
      <slot name="value"></slot>
    </h4>
  </div>
</template>