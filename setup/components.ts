
import VueNumberFormat from '@igortrindade/vue-number-format'
import VueTheMask from 'vue-the-mask'

// import AuthForm from '~~/modules/auth/AuthFormModal.vue'
// import SimulationRetirementOptionDetailDrawer from '@/modules/app/simulation/SimulationRetirementOptionDetailDrawer.vue'
import { vueNumberFormatDefaultOptions } from '@/util/functions/getCurrencyType'

export default (vueInstance) => {

  vueInstance.use(VueNumberFormat, vueNumberFormatDefaultOptions)
  vueInstance.use(VueTheMask)

  // vueInstance.component('AuthForm', AuthForm)
  // vueInstance.component('SimulationRetirementOptionDetailDrawer', SimulationRetirementOptionDetailDrawer)
}