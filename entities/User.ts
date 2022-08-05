export default class User {
  id: string | null = null
  key: string | null = null
  name: string = ''
  email: string = ''
  password: string = ''
  unencryptedPassword: string = ''
  phone: string = ''
  cpf: string = ''
  nit: string = ''
  gender: string = ''
  birthDate: string = ''
  motherName: string = ''
  role: string = ''
  
  constructor(obj = null) {
    this.id = obj?.id || null
    this.key = obj?.key || null
    this.name = obj?.name || ''
    this.email = obj?.email || process.env.NODE_ENV == 'development' ? 'igortrindademe@gmail.com' : ''
    this.unencryptedPassword = obj?.unencryptedPassword || process.env.NODE_ENV == 'development' ? '123123' : ''
    this.phone = obj?.phone || ''
    this.cpf = obj?.cpf || ''
    this.nit = obj?.nit || ''
    this.gender = obj?.gender || ''
    this.birthDate = obj?.birthDate || ''
    this.motherName = obj?.motherName || ''
    this.role = obj?.role || ''
  }
  
}