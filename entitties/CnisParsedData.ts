import SocialSecurityRelation from "./SocialSecurityRelation"

export default class CnisParsedData {
  
  
  cnisGeneratedAt: string = ''
  nit: string = ''
  cpf: string = ''
  name: string = ''
  gender: string = ''
  birthDate: string = ''
  motherName: string = ''
  cnisValidationNumber: string = ''
  
  avgCorrectedValue: string | number = 0
  lifeExpectancyValue: string | number = 0
  contributionTime: string | number = 0

  socialSecurityRelations: Array<SocialSecurityRelation> = []

  constructor(obj = null) {
    this.cnisGeneratedAt = obj?.cnisGeneratedAt || ''
    this.nit = obj?.nit || ''
    this.cpf = obj?.cpf || ''
    this.name = obj?.name || ''
    this.gender = obj?.gender || ''
    this.birthDate = obj?.birthDate || ''
    this.motherName = obj?.motherName || ''
    this.cnisValidationNumber = obj?.cnisValidationNumber || ''

    this.avgCorrectedValue = obj?.avgCorrectedValue || 0
    this.lifeExpectancyValue = obj?.lifeExpectancyValue || 0
    this.contributionTime = obj?.contributionTime || 0

    this.socialSecurityRelations = obj?.socialSecurityRelations || []
  }

}

