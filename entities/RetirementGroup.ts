import RetirementOption from '@/entities/RetirementOption'

export default interface RetirementGroup {
  key: number
  id: string
  title: string
  content: string
  retirementDate: string
  createdAt: string
  updatedAt: string

  retirementOptions: RetirementOption[]
}