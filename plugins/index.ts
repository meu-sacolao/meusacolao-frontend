import VueNumberFormat from '@igortrindade/vue-number-format'
import VueTheMask from 'vue-the-mask'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueNumberFormat, { prefix: 'R$ ', decimal: '.', thounsand: ',' })
  nuxtApp.vueApp.use(VueTheMask)
})