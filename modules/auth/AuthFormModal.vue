<template>
  <AppBaseModal :show="showAuthModal" @close="close">
    <div class="w-full flex flex-col space-y-6">

      <GoogleAuthButton />

      <div class="border-b border-zinc-100"></div>

      <div class="w-full flex border-b border-zinc-100">
        <div 
          v-for="(tab, index) in tabs"
          :key="`simulation-tabs-${index}`"
          class="px-8 lg:px-10 pb-2 border-b-8 cursor-pointer"
          :class="[tab == tabSelected ? 'border-cyan-800 hover:border-cyan-600' : 'border-transparent hover:border-zinc-100']"
          @click="tabSelected = tab"
        >
          <h5 class="h5 mb-0 whitespace-nowrap">{{ tab.label }}</h5>
        </div>
      </div>
      
      <transition name="slide-left" mode="out-in" appear>
        <TabLogin v-if="tabSelected.value === 'login'" @close="close" />
        <TabSignup v-else />
      </transition>
  
    </div>

  </AppBaseModal>
</template>

<script setup>

  import TabLogin from '@/modules/auth/TabLogin'
  import TabSignup from '@/modules/auth/TabSignup'
  import GoogleAuthButton from '@/modules/auth/GoogleAuthButton'
  import { getCurrentInstance } from 'vue'

  const { emit } = getCurrentInstance()

  defineEmits(['close'])

  const props = defineProps({
    showAuthModal: Boolean
  })

  const tabs = ref([
    {
      label: 'Entrar',
      value: 'login'
    },
    {
      label: 'Cadastre-se',
      value: 'signup'
    }
  ])

  const tabSelected = ref(tabs.value[0])

  const close = () => {
    emit('close')
  }  

</script>
