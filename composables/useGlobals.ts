import emitter from '@/util/emitter'
import Api from '@/util/Api'
import GraphQL from '@/util/GraphQL'
import Dates from '@/services/Dates'

export const useVueInstance = () => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.vueApp
}

export const useEmitter = () => {
  return emitter
}

export const useApi = () => {
  return Api
}

export const useGraphQL = () => {
  return GraphQL
}

export const useDates = () => {
  return Dates
}