import parse from '@/services/Dates/parse'
import { format } from 'date-fns'

export default (date: string | any, formatString: string = 'dd/MM/yyyy') => {
  if(!date) return null
  return format(parse(date), formatString)
}