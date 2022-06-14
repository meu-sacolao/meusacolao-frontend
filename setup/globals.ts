import mitt from 'mitt'
const emitter = mitt()

export default (vueInstance) => {
  vueInstance.config.globalProperties.emitter = emitter
}