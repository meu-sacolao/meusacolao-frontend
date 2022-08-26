import BaseModel from '@/entities/BaseModel'

export default class Client extends BaseModel {
  id: string | null = null
  key: string | null = null
  name: string = 'Igor'
  email: string = 'igorlucast@hotmail.com'
  phone: string = '(31)99999-9999'
  birthDate: string = '18/06/1986'
  motherName: string = 'Regina'
  cpf: string = '066.124.296-07'
  nit: string = '12.123123'
  gender: string = 'Masculino'
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