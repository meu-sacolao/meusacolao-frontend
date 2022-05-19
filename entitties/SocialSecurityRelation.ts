import Contribution from './Contribution'

export default class SocialSecurityRelation {
    seqNumber: string = ''
    nit: string = ''
    relationDocument: string = ''
    relationOrigin: string = ''
    relationType: string = ''
    startAt: string = ''
    endAt: string = ''
    lastPaymentAt: string = ''
    indicators: Array<string> = []
    contributions: Array<Contribution> = []
    
    contributionType: string = 'Contribuições'
    contributionTypeSplitter: string = 'Contribuição'

    socialSecurityRelationRawText: string = ''
    socialSecurityRelationHeaderRawText: string = ''
    socialSecurityRelationContributionsRawText: string = ''
}