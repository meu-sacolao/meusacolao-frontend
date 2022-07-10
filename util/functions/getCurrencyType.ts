
export const vueNumberFormatDefaultOptions = { prefix: 'R$ ', decimal: ',', thounsand: '.' }

const currencyReal = {
  title: 'Real',
  start: 1994,
  end: 2100,
  inputOptions: Object.assign({}, { prefix: 'R$' }, vueNumberFormatDefaultOptions)
}

const brazilianCurrencies = [

  {
    title: 'Cruzeiro',
    start: 1800,
    end: 1942,
    inputOptions: Object.assign({}, { prefix: 'Cr$' }, vueNumberFormatDefaultOptions)
  },
  {
    title: 'Cruzeiro Novo',
    start: 1967,
    end: 1969,
    inputOptions: Object.assign({}, { prefix: 'NCr$' }, vueNumberFormatDefaultOptions)
  },
  {
    title: 'Cruzeiro',
    start: 1970,
    end: 1985,
    inputOptions: Object.assign({}, { prefix: 'Cr$' }, vueNumberFormatDefaultOptions)
  },
  {
    title: 'Cruzado Novo',
    start: 1986,
    end: 1989,
    inputOptions: Object.assign({}, { prefix: 'NCZ$' }, vueNumberFormatDefaultOptions)
  },
  {
    title: 'Cruzeiro',
    start: 1990,
    end: 1992,
    inputOptions: Object.assign({}, { prefix: 'Cr$' }, vueNumberFormatDefaultOptions)
  },
  {
    title: 'Cruzeiro Real',
    start: 1993,
    end: 1994,
    inputOptions: Object.assign({}, { prefix: 'Cr$' }, vueNumberFormatDefaultOptions)
  },
  currencyReal
]

export default (year = null) => {
  if(!year || year < 1800 || year > 2100) return currencyReal
  const currency = brazilianCurrencies.filter((currency) => currency.start < year && currency.end > year)
  if(!currency.length) return currencyReal
  return currency
}