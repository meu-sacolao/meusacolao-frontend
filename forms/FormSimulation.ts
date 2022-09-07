
import BaseFormModel from "@/forms/BaseFormModel"

export default class FormSimulation extends BaseFormModel {

  retirementDate: string = ''
  simulationId: string = ''
  name: string = ''
  email: string = ''
  phone: string = ''
  birthDate: string = ''
  motherName: string = ''
  cpf: string = ''
  nit: string = ''
  gender: string = null
  acceptTerms: boolean = false

  constructor(data) {
    super()
    this.setFillableKeys(data)
  }

  get fillable() {
    return [
      'name',
      'email',
      'phone',
      'birthDate',
      'motherName',
      'cpf',
      'nit',
      'gender',
      'acceptTerms',
    ]
  }

  get requireds(): any[] {
    return [
      {
        item: 'retirementDate',
        validator: ['minLength:10', 'dateIsValid']
      },
      {
        item: 'name',
        validator: ['minLength:8', 'minWords:3']
      },
      {
        item: 'email',
        validator: 'emailValidator'
      },
      {
        item: 'phone',
        validator: 'phoneValidator'
      },
      {
        item: 'birthDate',
        validator: ['minLength:10', 'dateIsValid']
      },
      {
        item: 'cpf',
        validator: 'cpfValidator'
      },
      {
        item: 'gender'
      },
      {
        item: 'acceptTerms',
        validator: 'booleanShouldBeTrueValidation'
      },
    ]
  }

}