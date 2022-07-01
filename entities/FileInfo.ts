import BaseModel from '@/entities/BaseModel'

export default class FileInfo extends BaseModel {
  
  public type: string = '' 
  public name: string = ''

  constructor(attributes = {}) {
    super()
    this.setFillableKeys(this, FileInfo.fillable, attributes)
  }

  public static fillable =  [
    'type',
    'name',
  ]
}