import RetirementGroup from '@/entities/RetirementGroup'
import BaseModel from '@/entities/BaseModel'

export default class RetirementOption extends BaseModel {

  key: number
  id: string
  retirementGroupId: string
  rule: string
  title: string
  content: string
  createdAt: string
  updatedAt: string

  retirementGroup: RetirementGroup
  
  constructor(attributes = {}) {
    super()
    this.setFillableKeys(this, RetirementOption.fillable, attributes)
  }

  public static fillable =  [
    'key',
    'id',
    'title',
    'content',
    'retirementDate',
    'createdAt',
    'updatedAt',
    'retirementGroup'
  ]

}


