import Api from '@/util/Api'

export default class AdminGeneralApiService {

  static updateOrCreate(entity, instance) {
    return Api.post(`/admin/general/updateOrCreate`, { entity, ...instance })
  }


}