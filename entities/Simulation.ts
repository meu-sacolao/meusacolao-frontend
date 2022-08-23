import BaseModel from '@/entities/BaseModel'
import User from '@/entities/User'
import Client from '@/entities/Client'
import SimulationRetirementGroup from '@/entities/SimulationRetirementGroup'

export default class Simulation extends BaseModel {
  key: number = null
  id: string = null
  cnisFileId: string = null
  userId: string = null
  clientId: string = null
  title: string = ''
  retirementDate: string = ''
  isPendingUpdate: boolean = false
  createdAt: string = ''
  updatedAt: string = ''

  user: User = null
  client: Client = null
  simulationRetirementGroups: SimulationRetirementGroup[] = []

  constructor(attributes = {}) {
		super()
		this.setFillableKeys(this, Simulation.fillable, attributes)
	}

	public static fillable =  [
    'key',
    'id',
    'cnisFileId',
    'userId',
    'clientId',
    'title',
    'retirementDate',
    'isPendingUpdate',
    'createdAt',
    'user',
    'client',
    'simulationRetirementGroups',
  ]
}