<template>

  <transition name="fade">
    <div 
      v-if="showMenu"
      @click="toggleDrawer()"
      class="w-screen fixed inset-0 bg-slate-800 bg-opacity-50 mt-24"
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
      class="base-aside-dialog transition-all duration-200 easy-in-out transform bg-brand-gradient overflow-y-auto"
    >
      <ul 
        v-for="(group, index) in groups" 
        :key="`aside-group-${index}`"
        class="mt-4"
        v-show="checkPermission(group.roles)"
      >
        <h3 v-if="group.title"><span class="block text-2xl text-amber-500 pl-5 mb-4">
          <span class="border-b-2 border-zinc-400">{{ group.title }}</span></span>
        </h3>
        <li 
          v-for="(item, index) in group.items" 
          :key="`aside-item-${index}`"
          class="font-thin text-xl text-white mb-4 border-l-4 hover:border-amber-600 pl-4"
          v-show="checkPermission(item.roles)"
          :class="[route.path == item.action ? 'border-amber-600' : 'border-transparent']"
        >
          <button @click="makeAction(item.action)">{{ item.title }}</button>
        </li>
      </ul>

    </aside>
  </transition>

  <!-- GLOBAL MODALS PLACEHOLDER -->
  <AuthFormModalVue :showAuthModal="showAuthModal" @close="closeAuthModal"/>

</template>

<script setup>

  import AuthFormModalVue from '@/modules/auth/AuthFormModal.vue'
  import { getCurrentInstance } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from "@/modules/auth/store"
  import emitter from '@/util/emitter'

  const { emit, refs } = getCurrentInstance()
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  defineEmits(['update:showMenu'])

  const props = defineProps({
    showMenu: Boolean
  })

  const { loggedUser } = storeToRefs(authStore)

  const showAuthModal = ref(false)

  const groups = ref([
    {
      items: [
        {
          title: 'Simule sua aposentadoria',
          action: '/simulacao-de-aposentadoria'
        },
        {
          title: 'Entre ou cadastre-se',
          roles: 'NONE',
          action: () => {
            showAuthModal.value = true
          }
        }
      ]
    },
    {
      title: 'Gerenciamento',
      roles: ['ADMIN'],
      items: [
        {
          title: 'Simulações',
          action: '/admin/simulations'
        },
        {
          title: 'Usuários',
          action: '/admin/users'
        },
        {
          title: 'Segurados',
          action: '/admin/clients'
        }
      ]
    },
    {
      title: 'Plataforma',
      roles: ['ADMIN'],
      items: [
        {
          title: 'Artigos',
          action: '/admin/articles'
        },
        {
          title: 'Grupos de aposentadoria',
          action: '/admin/retirement-groups'
        },
        {
          title: 'Regras de aposentadoria',
          action: '/admin/retirement-options'
        },
      ]
    },
    {
      items: [
        {
          title: 'Sair',
          roles: 'ANY',
          action: () => {
            authStore.logout()
            router.push('/')
          }
        },
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
    if(typeof(action) === 'string') return router.push(action)
    action()
  }
  
  const checkPermission = (roles) => {
    if(!roles) return true
    if(roles === 'ANY' && loggedUser.value) return true
    if(roles === 'NONE' && !loggedUser.value) return true
    return loggedUser.value && roles.includes(loggedUser.value.role)
  }

  const closeAuthModal = () => {
    showAuthModal.value = false
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
