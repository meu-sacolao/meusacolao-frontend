<template>

  <transition name="fade">
    <div 
      v-if="showMenu"
      @click="toggleDrawer()"
      class="w-screen h-screen fixed inset-0 bg-slate-800 bg-opacity-50 mt-24"
    ></div>
  </transition>
  <transition
    enter-active-class="translate-x-full"
    enter-class=""
    enter-to-class=""
    leave-active-class=""
    leave-class=""
    leave-to-class="translate-x-full"
    mode="out-in"
  >
    <aside 
      v-if="showMenu" 
      ref="baseDrawer"
      class="base-aside-dialog transition-all duration-200 easy-in-out transform bg-brand-gradient"
    >
      <AppButton @click.prevent="emitter.emit('openModal', { component: 'AuthForm' })" bg="bg-slate-700" text="text-white">
        Login
      </AppButton>

      <ul 
        v-for="(group, index) in groups" 
        :key="`aside-group-${index}`"
        class="mt-4"
        v-show="checkPermission(group.roles)"
      >
        <li 
          v-for="(item, index) in group.items" 
          :key="`aside-item-${index}`"
          class="text-2xl text-white mt-2"
        >
          <button @click="makeAction(item.action)">{{ item.title }}</button>
        </li>
      </ul>

    </aside>
  </transition>
</template>

<script setup>

  import { defineProps, defineEmits, defineExpose, getCurrentInstance } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from "@/modules/auth/store"
  import { useRouter } from 'vue-router'
  import emitter from '@/util/emitter'

  const { emit, refs } = getCurrentInstance()
  const router = useRouter()
  const authStore = useAuthStore()

  const { loggedUser } = storeToRefs(authStore)

  const props = defineProps({
    showMenu: Boolean
  })

  defineEmits(['update:showMenu'])


  const actionsAvailable = {
    loginAction: () => {
      console.log('asdasd')
      console.log(emitter)
      emitter.emit('openModal', { component: 'AuthForm' })
    }
  }

  const groups = ref([
    {
      items: [
        {
          title: 'Entre ou cadastre-se',
          action: { function: 'loginAction' }
        },
        {
          title: 'Simule sua aposentadoria',
          action: '/simulacao-de-aposentadoria'
        }
      ]
    },
    {
      title: 'Administrativo',
      roles: ['ADMIN'],
      items: [
        {
          title: 'Simulações',
          action: '/admin/simulacoes'
        }
      ]
    }
  ])

  const toggleDrawer = () => {

      if(!props.showMenu) {
        addListeners()
      } else {
        removeListeners()
      }
      emit('update:showMenu', !props.showMenu)
    }

    const addListeners = () => {
      document.addEventListener("click", handleClickOutside)
      document.addEventListener("keyup", handleEsc)
    }

    const removeListeners = () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keyup", handleEsc)
    }

    const handleEsc = (evt) => {
      if (showMenu && evt.keyCode === 27) toggleDrawer()
    }

    const handleClickOutside = (event) => {
      if (!(refs['aside'] == event.target || refs['aside'] && refs['aside'].contains(event.target))) {
        toggleDrawer()
      }
    }

    const makeAction = (action) => {
      console.log(action)
      console.log(actionsAvailable)
      if(typeof(action === 'string')) return router.push(action)
      if(!actionsAvailable[action.function]) throw new Error(`Action: ${action.function} not available in actionsAvailable`)
      actionsAvailable[action.function]()
    }
    
    const checkPermission = (roles) => {
      if(!roles ||roles === 'ANY') return true
      if(roles === 'NONE' && loggedUser.value.role) return false
      return roles.includes(loggedUser.value.role)
    }

    defineExpose({
      toggleDrawer
    })

</script>

<style lang="scss">
  .base-aside-dialog {
    @apply mt-24 p-10 fixed top-0 right-0 h-screen w-full shadow-lg flex flex-col z-50 overflow-hidden 
  }

  @media (min-width: 576px) {
    .base-aside-dialog {
      @apply min-w-xl max-w-xl;
    }
  }
</style>
