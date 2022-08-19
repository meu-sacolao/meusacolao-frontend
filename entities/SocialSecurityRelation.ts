import Contribution from './Contribution'
import BaseModel from '@/entities/BaseModel'
export default class SocialSecurityRelation extends BaseModel {
	simulationId: string = ''
	seqNumber: number = 99
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

	constructor(attributes = {}) {
		super()
		this.setFillableKeys(this, SocialSecurityRelation.fillable, attributes)
	}

	public static fillable =  [
    'key',
    'id',
    'simulationId',
    'seqNumber',
    'nit',
    'relationDocument',
    'relationOrigin',
    'relationType',
    'startAt',
    'endAt'
  ]
}