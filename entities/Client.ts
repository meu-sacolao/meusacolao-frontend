import BaseModel from '@/entities/BaseModel'

export default class Client extends BaseModel {
  id: string | null = null
  key: string | null = null
  name: string = ''
  email: string = ''
  phone: string = ''
  birthDate: string = ''
  motherName: string = ''
  cpf: string = ''
  nit: string = ''
  gender: string = null
  createdAt: string = ''
  updatedAt: string = ''
  
  constructor(attributes = {}) {
    super()
    this.setFillableKeys(this, Client.fillable, attributes)
  }

  public static fillable =  [
    'key',
    'id',
    'name',
    'email',
    'phone',
    'birthDate',
    'motherName',
    'cpf',
    'nit',
    'gender',
    'createdAt',
    'updatedAt',
  ]

  
}