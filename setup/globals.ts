import mitt from 'mitt'
import Api from '@/util/Api'
const emitter = mitt()

export default (vueInstance) => {
  vueInstance.config.globalProperties.emitter = emitter
  vueInstance.config.globalProperties.api = Api
}