import Api from '@/util/Api'
import FileInfo from '@/entities/FileInfo'
export default class AdminGeneralApiService {

  static updateOrCreate(entity, instance) {

    if(instance.file && instance.file.name) {

      const fd = new FormData()
      fd.append('entity', entity)

      Object.keys(instance).forEach((key) => {
        if( ![undefined, null].includes(instance[key]) )  {
          fd.append(key, instance[key])
        }
      })

      return Api.post(`/admin/general/updateOrCreate`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })

    } else {
      return Api.post(`/admin/general/updateOrCreate`, { entity, ...instance })
    }

  }


}