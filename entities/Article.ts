import BaseModel from '@/entities/BaseModel'
import FileInfo from '@/entities/FileInfo'
import Category from '@/entities/Category'
export default class Article extends BaseModel {

  key: number = null
  id: string = null
  slug: string = null
  title: string = null
  content: string = null
  pathUrl: string = null
  isPublished: boolean = null
  isStarred: boolean = null
  order: number = 0
  createdAt: string = null
  updatedAt: string = null

  categories: Category[] = []
  file: FileInfo = new FileInfo()
  
  constructor(attributes = {}) {
    super()
    this.setFillableKeys(this, Article.fillable, attributes)
  }

  public static fillable =  [
    'key',
    'id',
    'slug',
    'title',
    'content',
    'order',
    'pathUrl',
    'isPublished',
    'isStarred',
    'createdAt',
    'updatedAt',
    'file',
    'categories',
  ]

}


