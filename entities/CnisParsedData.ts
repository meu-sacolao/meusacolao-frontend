import SocialSecurityRelation from "./SocialSecurityRelation"
import Contribution from "./Contribution"
import User from "./User"

export default class CnisParsedData {
  
  cnisGeneratedAt: string = ''
  cnisValidationNumber: string = ''
  
  lifeExpectancyValue: string | number = 0
  contributionTime: string | number = 0

  retirementDate: string = ''
  lifeExpectationValue: number = 0
  retirementFactor: number = 0
  ageOnRetirementDate: number = 0
  contributionTimeInDays: number = 0
  contributionTimeInMonths: number = 0
  contributionTimeInYears: number = 0
  contributionTimeString: string = ''
  avgMajor80Percent: number = 0
  avgAllContributions: number = 0
  withAliquot70: number = 0
  withAliquot60: number = 0
  avgAllWithRetirementFactor: number = 0

  ages: any = null

  user: User = new User()
  socialSecurityRelations: Array<SocialSecurityRelation> = []
  retirementGroups: Array<any> = []

  _debugItems: Array<any> = []

  constructor(obj = null) {
    this.cnisGeneratedAt = obj?.cnisGeneratedAt || ''
    this.cnisValidationNumber = obj?.cnisValidationNumber || ''

    this.lifeExpectancyValue = obj?.lifeExpectancyValue || 0
    this.contributionTime = obj?.contributionTime || 0

    this.retirementDate = obj?.retirementDate || ''
    this.lifeExpectationValue = obj?.lifeExpectationValue || 0
    this.retirementFactor = obj?.retirementFactor || 0
    this.ageOnRetirementDate = obj?.ageOnRetirementDate || 0
    this.contributionTimeInDays = obj?.contributionTimeInDays || 0
    this.contributionTimeInMonths = obj?.contributionTimeInMonths || 0
    this.contributionTimeInYears = obj?.contributionTimeInYears || 0
    this.contributionTimeString = obj?.contributionTimeString || ''
    this.avgMajor80Percent = obj?.avgMajor80Percent || 0
    this.avgAllContributions = obj?.avgAllContributions || 0
    this.withAliquot70 = obj?.withAliquot70 || 0
    this.withAliquot60 = obj?.withAliquot60 || 0
    this.avgAllWithRetirementFactor = obj?.avgAllWithRetirementFactor || 0

    this.ages = obj?.ages || null

    this.user = obj?.user || new User()
    this.socialSecurityRelations = obj?.socialSecurityRelations || []
    this.retirementGroups = obj?.retirementGroups || []

    //Debug items
    this._debugItems = obj?._debugItems || []
  }

}

