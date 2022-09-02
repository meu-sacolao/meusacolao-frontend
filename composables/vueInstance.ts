

export const useVueInstance = () => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.vueApp
}