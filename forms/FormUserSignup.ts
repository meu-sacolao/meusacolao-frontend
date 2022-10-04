
import BaseFormModel from "@/forms/BaseFormModel"

export default class FormUserSignup extends BaseFormModel {

  name: string = ''
  email: string = ''
  phone: string = ''
  unencryptedPassword: string = ''

  constructor(data) {
    super()
    this.setFillableKeys(data)
  }

  get fillable() {
    return [
      'name',
      'email',
      'phone',
      'unencryptedPassword',
    ]
  }

  get requireds(): any[] {
    return [
      {
        item: 'name',
        validator: ['minLength:8', 'minWords:2']
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
        item: 'unencryptedPassword',
        validator: ['minLength:8']
      },
    ]
  }

}