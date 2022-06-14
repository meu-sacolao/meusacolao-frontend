import EventBus from '@/util/EventBus'

export default (vueInstance) => {
  vueInstance.config.globalProperties.$eventBus = EventBus
}