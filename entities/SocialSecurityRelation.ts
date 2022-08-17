import Contribution from './Contribution'

export default class SocialSecurityRelation {
    seqNumber: string = ''
    nit: string = ''
    relationDocument: string = ''
    relationOrigin: string = ''
    relationType: string = ''
    startAt: string = ''
    endAt: string = ''
    specialTime: number = 1
    lastPaymentAt: string = ''
    indicators: Array<string> = []
    history: Array<string> = []
    contributions: Array<Contribution> = []
    isIgnored: boolean = false
    ignoredReason: string = ''
    
    contributionType: string = 'Contribuições'
    contributionTypeSplitter: string = 'Contribuição'

    socialSecurityRelationRawText: string = ''
    socialSecurityRelationHeaderRawText: string = ''
    socialSecurityRelationContributionsRawText: string = ''
}