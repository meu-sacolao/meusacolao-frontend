import { add } from 'date-fns'
import parse from './parse'

export default (date: string | Date | number, quantity: number, type: string = 'days') => {
  return add(parse(date), { [type] : quantity })
}