import BaseModel from '@/entities/BaseModel'
import FileInfo from '@/entities/FileInfo'
import Article from '@/entities/Article'

export default class Category extends BaseModel {

  key: number = null
  id: string = null
  slug: string = null
  title: string = null
  isList: boolean = false
  pathUrl: string = null
  order: number = 0
  createdAt: string = null
  updatedAt: string = null

  file: FileInfo = new FileInfo()
  articles: Article[] = []
  
  constructor(attributes = {}) {
    super()
    this.setFillableKeys(this, Category.fillable, attributes)
  }

  public static fillable =  [
    'key',
    'id',
    'slug',
    'title',
    'isList',
    'order',
    'pathUrl',
    'createdAt',
    'updatedAt',
    'file',
    'articles',
  ]

}


