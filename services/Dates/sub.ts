import { sub } from 'date-fns'
import parse from './parse'

export default (date: string | Date | number, quantity: number, type: string = 'days') => {
  return sub(parse(date), { [type] : quantity })
}