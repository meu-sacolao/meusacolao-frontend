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

  allContributions: Array<Contribution> = []
  contributionsWithinTimeframe: Array<Contribution> = []
  contributionsOutOfTimeFrame: Array<Contribution> = []
  contributionsLessThan80Percent: Array<Contribution> = []

  constructor(obj = null) {
    this.cnisGeneratedAt = obj?.cnisGeneratedAt || ''
    this.cnisValidationNumber = obj?.cnisValidationNumber || ''

    this.avgCorrectedValue = obj?.avgCorrectedValue || 0
    this.lifeExpectancyValue = obj?.lifeExpectancyValue || 0
    this.contributionTime = obj?.contributionTime || 0

    this.user = obj?.user || new User()
    this.socialSecurityRelations = obj?.socialSecurityRelations || []

    //Debug items
    this.allContributions = obj?.allContributions || []
    this.contributionsWithinTimeframe = obj?.contributionsWithinTimeframe || []
    this.contributionsOutOfTimeFrame = obj?.contributionsOutOfTimeFrame || []
    this.contributionsLessThan80Percent = obj?.contributionsLessThan80Percent || []
  }

}

