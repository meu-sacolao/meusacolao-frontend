<template>
  <nav class="fixed top-0 right-0 left-0 z-50 w-full px-6 md:px-20 xl:px-28 flex flex-wrap justify-between items-center h-24 font-sans bg-gradient-to-br from-cyan-900 to-cyan-800 shadow-xl">
    <div class=" flex">
      <img src="/images/logo/1x/LOGO_2_1_1x.png" class="h-14" alt="Logo Calculo e previdência"/>
    </div>

    <div class="flex">
      </div>
    <button 
      @click="toggleMenu()"
      class="menu-toggle" 
      :class="{ 'active' : menuIsOpen }"
    >
      <span class="menu-toggle-bar"></span>
      <span class="menu-toggle-bar"></span>
      <span class="menu-toggle-bar"></span>
    </button>

    <AppAside ref="AppAside"  v-model:menuIsOpen="menuIsOpen" />
  </nav>
</template>

<script>
export default {
  name: 'AppPageHeader',
  data() {
    return {
      menuIsOpen: true
    }
  },
  methods: {
    toggleMenu() {
      console.log(this.$refs['AppAside'])
      this.$refs['AppAside'].toggleDrawer()
    }
  }
}
</script>

<style>

</style>