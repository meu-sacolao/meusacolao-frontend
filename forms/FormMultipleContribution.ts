
import BaseFormModel from "@/forms/BaseFormModel"
import SocialSecurityRelation from "~~/entities/SocialSecurityRelation"
import Dates from '@/services/Dates'
export default class FormMultipleContribution extends BaseFormModel {

  simulationId: string = null
  socialSecurityRelationId: string = null
  startMonthReference: string = ''
  endMonthReference: string = ''
  baseValue: number = 0
  setValueBasedOn: string = 'FIXED_VALUE'
  isIgnored: boolean = false
  ignoredReason: string = ''
  shouldUpdateExistings: boolean = false
  socialSecurityRelation: SocialSecurityRelation = null

  get MULTIPLE_CONTRIBUTIONS_VALUE_BASED() {
    return [
      { value: 'FIXED_VALUE', label: 'Valor pré-definido' },
      { value: 'MIN', label: 'Valor mínimo vigente' },
      { value: 'MAX', label: 'Valor teto vigente (máximo)' },
    ]
  }

  constructor(socialSecurityRelation = { id: null }) {
    super()
    this.setFillableKeys({ ...socialSecurityRelation, socialSecurityRelation})

    if(socialSecurityRelation) this.socialSecurityRelationId = socialSecurityRelation.id
    if(this.socialSecurityRelation.startAt) this.startMonthReference = Dates.format(this.socialSecurityRelation.startAt, 'MM/yyyy')
    if(this.socialSecurityRelation.endAt) this.endMonthReference = Dates.format(this.socialSecurityRelation.endAt, 'MM/yyyy')

  }

  get fillable() {
    return [
      'simulationId',
      'socialSecurityRelationId',
      'startMonthReference',
      'endMonthReference',
      'baseValue',
      'setValueBasedOn',
      'isIgnored',
      'ignoredReason',
      'shouldUpdateExistings',
      'socialSecurityRelation',
    ]
  }

  get requireds(): any[] {
    return [
      {
        item: 'startMonthReference',
        validator: ['minLength:7', 'dateIsValid']
      },
      {
        item: 'endMonthReference',
        validator: ['minLength:7', 'dateIsValid']
      },
      {
        item: 'baseValue'
      },
      {
        item: 'setValueBasedOn'
      }
    ]
  }

}