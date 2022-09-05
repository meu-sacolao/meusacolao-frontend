
import BaseModel from "@/entities/BaseModel"
import FileInfo from '@/entities/FileInfo'

export default class FormCnisFileUpload extends BaseModel {

  retirementDate: string = process.env.NODE_ENV == 'production' ? '' : '10/10/2020'
  file: FileInfo = new FileInfo()
  acceptTerms: boolean = false
  tried: boolean = false

  get requireds(): any[] {
    return [
      {
        item: 'retirementDate',
        validation: ['minLength: 10', 'dateIsValid']
      },
      {
        item: 'file',
        validation: 'fileValidation'
      },
      {
        item: 'acceptTerms',
        validation: 'booleanShouldBeTrueValidation'
      }
    ]
  }

}