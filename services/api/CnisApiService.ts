import Api from '@/util/Api'

export default class CnisApiService {

  static upload({ file, retirementDate }) {
    const fd = new FormData()
    fd.append('cnisFile', file)
    fd.append('cnisFileName', file.name)
    fd.append('retirementDate', retirementDate)
    return Api.post(`/cnis/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(({ data }) => {

        try {
          const vueInstance = useVueInstance()
          vueInstance.config.globalProperties.$gtag.event('CRIAR_SIMULAÇÃO_COM_CNIS', { event_category: 'INTERAÇÕES', value: data.simulation.id })
        } catch (err) {
          console.log(err)
        }
        
        return { simulation: data.simulation }
      })
  }
}