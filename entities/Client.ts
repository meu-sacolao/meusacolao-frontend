import BaseModel from '@/entities/BaseModel'
import { cpfValidator, emailValidator, bdayValidator, phoneValidator } from '@/util/validators'

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

  get requireds() {
    return [
      //Buyer validation
      {
        item: 'name',
        label: 'nome do segurado',
      },
      {
        item: 'email',
        label: 'email do segurado',
        validation: value => emailValidator(value)
      },
      {
        item: 'phone',
        label: 'telefone',
        validation: value => phoneValidator(value)
      },
      {
        item: 'cpf',
        label: 'seu cpf válido',
        validation: value => cpfValidator(value)
      },
      {
        item: 'birthDate',
        label: 'Data de nascimento do segurado',
        message: 'Informe a data de nascimento do segurado',
        validation: value => bdayValidator(value)
      },
      {
        item: 'gender',
        label: 'gênero do segurado'
      }
    ]
  }

  
}