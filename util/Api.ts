import axios from 'axios'
import config from '@/config'
import { useAuthStore } from "@/modules/auth/store"


/**
 * Default headers
 */
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = '*/*'
axios.defaults.baseURL = config[process.env.NODE_ENV]['API_BASE_URL']


/**
 * Request interceptors
 */
axios.interceptors.request.use(function (request) {
  
  const authStore = useAuthStore()
  const { loggedUserToken } = authStore
  if(loggedUserToken) request.headers['Authorization'] = `Bearer ${loggedUserToken}`

  return request
}, function (error) {
  // console.log(error)
  return Promise.reject(error)

})

/**
 * Response interceptors
 */
axios.interceptors.response.use(function (response) {

 
  return response;

}, function (error) {

  const authStore = useAuthStore()
  const router = useRouter()

  if(error.response && [401, 403].includes(error.response.status)) {
    alert('Sessão expirada.')
    authStore.logout()
    router.push('/')
  }

  return Promise.reject(error)

})

export default axios
