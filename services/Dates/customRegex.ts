export const regexValorMonetario = new RegExp('[,]{1}[0-9]{2}$')
export const regexMonthAndYear = new RegExp(/^[0-9]{2}\/[0-9]{4}/)
export const regexDayMonthAndYear = new RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
export const regexYearMonthAndDay = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)
export const regexHoursMinutesSeconds = new RegExp(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
export const regexNit = new RegExp(/(?=_____[0-9]{3}.{1}[0-9]{5}.[0-9]{2}-[0-9]{1}___)/)
export const regexExtractNit = new RegExp(/[0-9]{3}.{1}[0-9]{5}.[0-9]{2}-[0-9]{1}/)
export const regexExtractCpf = new RegExp(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/)
export const regexExtractCnpj = new RegExp(/[0-9]{2}.[0-9]{3}.[0-9]{3}\/[0-9]{4}-[0-9]{2}/)

export default {
  regexValorMonetario,
  regexMonthAndYear,
  regexDayMonthAndYear,
  regexYearMonthAndDay,
  regexHoursMinutesSeconds,
  regexNit,
  regexExtractNit,
  regexExtractCpf,
  regexExtractCnpj,
}
