import BaseFormModel from "@/forms/BaseFormModel"

export default class FormAdminRetirementGroup extends BaseFormModel {

  id: string = null
  title: string = ''
  content: string = ''
  description: string = ''
  isPreReform: boolean = false

  constructor(data) {
    super()
    this.setFillableKeys(data)
  }

  get fillable() {
    return [
      'id',
      'title',
      'content',
      'description',
      'isPreReform'
    ]
  }

  get requireds(): any[] {
    return [
      {
        item: 'title',
        validator: ['minWords:1']
      },
      {
        item: 'description',
        validator: ['minWords:2']
      },
      {
        item: 'content',
        validator: ['minWords:10']
      }
    ]
  }

}