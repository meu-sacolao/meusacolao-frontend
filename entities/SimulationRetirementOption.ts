import RetirementOption from '@/entities/RetirementOption'

interface RequirementRuleInterface {
  isGranted: boolean,
  content: string
}

export default interface SimulationRetirementOption {
  key: number
  id: string
  simulationId: string
  simulationRetirementGroupId: string
  retirementOptionId: string
  isGranted: string
  requirements: string
  retirementDate: RequirementRuleInterface[]
  createdAt: string
  updatedAt: string

  retirementOption: RetirementOption
}