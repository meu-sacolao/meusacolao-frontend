import BaseFormModel from "@/forms/BaseFormModel"

export default class FormAdminRetirementOption extends BaseFormModel {

  id: string = null
  retirementGroupId: string = null
  rule: string = null
  title: string = ''
  content: string = ''
  description: string = ''
  showForNotLoggedUsers: boolean = false

  constructor(data) {
    super()
    this.setFillableKeys(data)
  }

  get fillable() {
    return [
      'id',
      'retirementGroupId',
      'rule',
      'title',
      'content',
      'description',
      'showForNotLoggedUsers'
    ]
  }

  get requireds(): any[] {
    return [
      {
        item: 'retirementGroupId'
      },
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