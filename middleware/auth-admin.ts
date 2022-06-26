import { useAuthStore } from "@/modules/auth/store"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { loggedUser } = authStore
  if(loggedUser.role !== 'ADMIN') return navigateTo('/')
})