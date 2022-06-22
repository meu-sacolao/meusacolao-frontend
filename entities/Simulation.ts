import User from '@/entities/User'
import SimulationRetirementGroup from '@/entities/SimulationRetirementGroup'

export default class Simulation {
  key: number
  id: string
  cnisFileId: string
  userId: string
  title: string
  retirementDate: string
  createdAt: string
  updatedAt: string

  user: User
  simulationRetirementGroups: SimulationRetirementGroup[]
}