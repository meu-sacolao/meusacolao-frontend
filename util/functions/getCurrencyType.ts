import Dates from '@/services/Dates'
export const vueNumberFormatDefaultOptions = { prefix: 'R$ ', decimal: ',', thounsand: '.' }

const currencyReal = {
  title: 'Real',
  start: '01/07/1994',
  end: '31/12/2200',
  vueNumberFormatOptions: Object.assign({ prefix: 'R$ ' }, vueNumberFormatDefaultOptions)
}

const brazilianCurrencies = [

  {
    title: 'Cruzeiro',
    start: '01/11/1942',
    end: '12/12/1967',
    vueNumberFormatOptions: Object.assign({}, vueNumberFormatDefaultOptions, { prefix: 'Cr$ ' })
  },
  {
    title: 'Cruzeiro Novo',
    start: '13/12/1967',
    end: '14/05/1970',
    vueNumberFormatOptions: Object.assign({}, vueNumberFormatDefaultOptions, { prefix: 'NCr$ ' })
  },
  {
    title: 'Cruzeiro',
    start: '15/05/1970',
    end: '27/02/1986',
    vueNumberFormatOptions: Object.assign({}, vueNumberFormatDefaultOptions, { prefix: 'Cr$ ' })
  },
  {
    title: 'Cruzado',
    start: '28/02/1986',
    end: '15/01/1989',
    vueNumberFormatOptions: Object.assign({}, vueNumberFormatDefaultOptions, { prefix: 'NCZ$ ' })
  },
  {
    title: 'Cruzado Novo',
    start: '16/01/1989',
    end: '15/03/1990',
    vueNumberFormatOptions: Object.assign({}, vueNumberFormatDefaultOptions, { prefix: 'NCZ$ ' })
  },
  {
    title: 'Cruzeiro',
    start: '16/03/1990',
    end: '31/07/1993',
    vueNumberFormatOptions: Object.assign({}, vueNumberFormatDefaultOptions, { prefix: 'Cr$ ' })
  },
  {
    title: 'Cruzeiro Real',
    start: '01/08/1993',
    end: '30/06/1994',
    vueNumberFormatOptions: Object.assign({}, vueNumberFormatDefaultOptions, { prefix: 'Cr$ ' })
  },
  currencyReal
]

export default (dateReference = null) => {
  const date = Dates.parse(dateReference)
  const currency = brazilianCurrencies.filter((currency) => Dates.parse(currency.start) < date && Dates.parse(currency.end) > date)
  if(!currency.length) return currencyReal
  return currency[0]
}