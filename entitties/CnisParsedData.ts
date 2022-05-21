import SocialSecurityRelation from "./SocialSecurityRelation"
import Contribution from "./Contribution"
import User from "./User"

export default class CnisParsedData {
  
  cnisGeneratedAt: string = ''
  cnisValidationNumber: string = ''
  
  avgCorrectedValue: string | number = 0
  lifeExpectancyValue: string | number = 0
  contributionTime: string | number = 0

  user: User = new User()
  socialSecurityRelations: Array<SocialSecurityRelation> = []

  _debugItems: Array<any> = []

  constructor(obj = null) {
    this.cnisGeneratedAt = obj?.cnisGeneratedAt || ''
    this.cnisValidationNumber = obj?.cnisValidationNumber || ''

    this.avgCorrectedValue = obj?.avgCorrectedValue || 0
    this.lifeExpectancyValue = obj?.lifeExpectancyValue || 0
    this.contributionTime = obj?.contributionTime || 0

    this.user = obj?.user || new User()
    this.socialSecurityRelations = obj?.socialSecurityRelations || []

    //Debug items
    this._debugItems = obj?._debugItems || []
  }

}

