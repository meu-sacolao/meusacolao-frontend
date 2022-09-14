import BaseModel from './BaseModel'

export default class User extends BaseModel {
  key: string | null = null
  id: string | null = null
  name: string = ''
  email: string = process.env.NODE_ENV == 'development' ? 'igortrindademe@gmail.com' : ''
  password: string = ''
  unencryptedPassword: string = process.env.NODE_ENV == 'development' ? '123123' : ''
  pathUrl: string = ''
  lastLoginAt: string = ''
  sessionCount: string = ''
  isBlocked: boolean = false
  role: string = ''
  
  constructor(attributes = {}) {
    super()
    this.setFillableKeys(this, User.fillable, attributes)
  }

  public static fillable =  [
    'key',
    'id',
    'name',
    'email',
    'password',
    'unencryptedPassword',
    'pathUrl',
    'lastLoginAt',
    'sessionCount',
    'isBlocked',
    'role',
  ]
  
}