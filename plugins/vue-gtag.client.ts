import VueGtag from "vue-gtag"
import { bootstrap } from "vue-gtag"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    config: { id: "G-XECNGGTT5P" },
    bootstrap: false
  })
  
  bootstrap()
  .then(() => {
    console.log('Tag started successfully!')
    const router = useRouter()
      router.beforeEach((to) => {
        try {
          nuxtApp.vueApp.config.globalProperties.$gtag.pageview(to.fullPath)
        } catch (error) {
        }
      })
    })
  })
  

