
import VueNumberFormat from '@igortrindade/vue-number-format'
import VueTheMask from 'vue-the-mask'

import AuthForm from '@/modules/auth/AuthForm.vue'
import SimulationRetirementOptionDetailDrawer from '@/modules/app/simulation/SimulationRetirementOptionDetailDrawer.vue'

export default (vueInstance) => {

  vueInstance.use(VueNumberFormat, { prefix: 'R$ ', decimal: '.', thounsand: ',' })
  vueInstance.use(VueTheMask)

  vueInstance.component('AuthForm', AuthForm)
  vueInstance.component('SimulationRetirementOptionDetailDrawer', SimulationRetirementOptionDetailDrawer)
}