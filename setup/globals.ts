import Api from '@/util/Api'
import emitter from '@/util/emitter'

export default (vueInstance) => {
  vueInstance.config.globalProperties.emitter = emitter
  vueInstance.config.globalProperties.api = Api
}