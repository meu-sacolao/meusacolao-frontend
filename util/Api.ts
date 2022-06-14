import axios from 'axios'
import config from '@/config'

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

  return Promise.reject(error)

})

export default axios
