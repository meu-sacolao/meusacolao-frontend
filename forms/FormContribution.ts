
import BaseFormModel from "@/forms/BaseFormModel"

export default class FormContribution extends BaseFormModel {

  id: string = null
  socialSecurityRelationId: string = ''
  simulationId: string = ''
  monthReference: string = ''
  baseValue: string = ''
  isIgnored: boolean = false
  ignoredReason: string = ''

  constructor(data) {
    super()
    this.setFillableKeys(data)
  }

  get fillable() {
    return [
      'id',
      'socialSecurityRelationId',
      'simulationId',
      'monthReference',
      'baseValue',
      'isIgnored',
      'ignoredReason',
    ]
  }

  get requireds(): any[] {
    return [
      {
        item: 'monthReference',
        validator: ['minLength:7', 'dateIsValid']
      },
      {
        item: 'baseValue'
      }
    ]
  }

}