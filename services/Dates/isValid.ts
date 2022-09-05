import { isValid } from 'date-fns'
import Dates from '@/services/Dates'

export default (date) => {
  return isValid(Dates.parse(date))
}