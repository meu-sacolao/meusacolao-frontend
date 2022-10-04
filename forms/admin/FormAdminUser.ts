
import BaseFormModel from "@/forms/BaseFormModel"
import Validators from '@/forms/Validators'
export default class FormAdminUser extends BaseFormModel {

  id: string = ''
  name: string = ''
  email: string = ''
  phone: string = ''
  updatedPassword: boolean = false
  unencryptedPassword: string = ''
  role: string = ''
  file: string = ''
  isBlocked: boolean = false
  description: string = ''

  constructor(data) {
    super()
    this.setFillableKeys(data)
  }

  get fillable() {
    return [
      'id',
      'name',
      'email',
      'phone',
      'unencryptedPassword',
      'role',
      'file',
      'isBlocked',
      'description',
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
        item: 'unencryptedPassword',
        validator: (value, instance) => {
          if(!instance.updatePassword) return false
          if(!value || Validators.minLength(value)) return true
          return false
        }
      },
      {
        item: 'role',
      }
    ]
  }

}