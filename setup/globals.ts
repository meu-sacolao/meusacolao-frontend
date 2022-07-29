import Api from '@/util/Api'
import emitter from '@/util/emitter'
import dragAndDropTouchProxy from '@/util/functions/dragAndDropTouchProxy.js'
import generalErrorHandler from '@/setup/generalErrorHandler.js'
import socket from '@/setup/socket'

export default (vueInstance) => {

  if(process.client) {
    dragAndDropTouchProxy()
    generalErrorHandler()
    socket(vueInstance)
    vueInstance.provide('api', Api)
    vueInstance.provide('emitter', emitter)
  }
  
}