export default class Contribution {
  monthReference: string = ''
  paidAt: string = ''

  baseValue: number = 0 // Valor salario do cnis
  valueAfterCheckLimit: number = 0 // Valor apos aplicação da regra do teto
  valueAfterCorrection: number = 0 // Valor apos a correção
  finalValue: number = 0 // Valor final
  contributionValue: string = ''
  indicators: string = ''

  indexCorrection: string | number = 0 // Indice utilizado da correção
  limitValue: string | number = 0 // Valor do teto
  isExceededLimit: boolean = false // Se o valor excedeu o teto setar como true
  isIgnored: boolean = false // Se o valor não estiver dentro dos 80% setar como true
  contributionLimit: any

  indexSocialSecurityRelation: number = -1 // Index do socialSecurityRelation / vinculo para manipulação desacoplada da instância
  indexContribution: number = -1
}