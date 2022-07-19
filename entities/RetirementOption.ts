import RetirementGroup from '@/entities/RetirementGroup'
import BaseModel from '@/entities/BaseModel'

export default class RetirementOption extends BaseModel {

  key: number = null
  id: string = null
  retirementGroupId: string = null
  rule: string = null
  title: string = null
  description: string = null
  content: string = null
  showForNotLoggedUsers: boolean = false
  order: number = null
  createdAt: string = null
  updatedAt: string = null

  retirementGroup: RetirementGroup
  
  constructor(attributes = {}) {
    super()
    this.setFillableKeys(this, RetirementOption.fillable, attributes)
  }

  public static fillable =  [
    'key',
    'id',
    'retirementGroupId',
    'title',
    'description',
    'content',
    'showForNotLoggedUsers',
    'order',
    'createdAt',
    'updatedAt',
    'retirementGroup',
  ]

}


