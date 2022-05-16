
export default class CnisParsedData {
  cnisGeneratedAt: string = ''
  nit: string = ''
  cpf: string = ''
  name: string = ''
  birthDate: string = ''
  motherName: string = ''
  cnisValidationNumber: string = ''

  socialSecurityRelations: Array<any> = []

  constructor(obj = null) {
    this.cnisGeneratedAt = obj?.cnisGeneratedAt || ''
    this.nit = obj?.nit || ''
    this.cpf = obj?.cpf || ''
    this.name = obj?.name || ''
    this.birthDate = obj?.birthDate || ''
    this.motherName = obj?.motherName || ''
    this.cnisValidationNumber = obj?.cnisValidationNumber || ''

    this.socialSecurityRelations = obj?.socialSecurityRelations || []
  }

}

