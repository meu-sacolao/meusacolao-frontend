
import VueNumberFormat from '@igortrindade/vue-number-format'
import VueTheMask from 'vue-the-mask'
import AuthForm from '@/modules/auth/AuthForm'

export default (vueInstance) => {

  vueInstance.use(VueNumberFormat, { prefix: 'R$ ', decimal: '.', thounsand: ',' })
  vueInstance.use(VueTheMask)

  vueInstance.component('AuthForm', AuthForm)
}