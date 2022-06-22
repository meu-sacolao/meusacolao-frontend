import RetirementGroup from '@/entities/RetirementGroup'
import SimulationRetirementOption from '@/entities/SimulationRetirementOption'

export default interface SimulationRetirementGroup {
  key: number
  id: string
  simulationId: string
  retirementGroupId: string
  title: string
  retirementDate: string
  createdAt: string
  updatedAt: string

  retirementGroup: RetirementGroup
  simulationRetirementOptions: SimulationRetirementOption[]
}