import LogRocket from 'logrocket'

export default defineNuxtPlugin((nuxtApp) => {
  if(process.env.NODE_ENV !== 'development') LogRocket.init('l47nxa/calculo-e-previdencia')
})