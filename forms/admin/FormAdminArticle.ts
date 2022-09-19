
import BaseFormModel from "@/forms/BaseFormModel"
import FileInfo from '@/entities/FileInfo'

export default class FormAdminArticle extends BaseFormModel {

  id: string = null
  userId: string = ''
  title: string = ''
  slug: string = ''
  content: string = ''
  pathUrl: string = ''
  isPublished: boolean = false
  hidePublishedAt: boolean = false
  hideAuthor: boolean = false
  publishedAt: string = ''
  
  file: FileInfo = new FileInfo()
  categories: any[] = []

  constructor(data) {
    super()
    this.setFillableKeys(data)
  }

  get fillable() {
    return [
      'id',
      'userId',
      'title',
      'slug',
      'content',
      'pathUrl',
      'isPublished',
      'hidePublishedAt',
      'hideAuthor',
      'publishedAt',
      'categories'
    ]
  }

  get requireds(): any[] {
    return [
      {
        item: 'userId'
      },
      {
        item: 'title',
        validator: ['minWords:2']
      },
      {
        item: 'content',
        validator: ['minWords:10']
      },
      {
        item: 'categories',
        validator: 'minLength:1'
      },
      {
        item: 'publishedAt',
        validator: ['minLength:10', 'dateIsValid']
      },
    ]
  }

}