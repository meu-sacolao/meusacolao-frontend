import { ObjectHelpers, ArrayHelpers } from '@igortrindade/lazyfy'

export default class BaseModel {

  static fillable =  []

  get requireds() {
    return []
  }

  public static getFillableKeys(data: any = {}) {
    return ObjectHelpers.filterObjectKeys(this.fillable, data)
  }

  public setFillableKeys(instance, keys, data) {
    for(const key of keys) {
      if(typeof(data[key]) !== 'undefined') instance[key] = data[key]
    }
  }


  get errors(){
    return this.requireds.filter((req) => {

      if(typeof (this[req.item]) == 'boolean' && !this[req.item]) {
        return false
      }

      if (typeof (req.validation) == 'function') {
        return req.validation(this[req.item], this)
      }

      if (
        typeof (this[req.item]) == 'string' && !this[req.item].length
        || Array.isArray(this[req.item]) && !this[req.item].length
        || typeof (this[req.item]) == 'object' && !this[req.item]
      ) {
        return true
      }

      return false
    }).map((item) => {
      return { item: item.item, label: item.label }
    })
  }

  get hasError(){
    return (this.errors.length) ? true : false
  }

  get errorPhrase(){
    return {
      init: 'Por favor, verifique os itens ',
      end: ' para continuar.'
    }
  }

  get validationPhrase(){
    return this.errorPhrase.init + this.errors.map((erro) => erro.label).join(', ') + this.errorPhrase.end
  }

  get validationPhraseHtml(){
    return `${this.errorPhrase.init} <b>${this.errors.map((erro) => erro.label).join(', ')}</b> ${this.errorPhrase.end}`
  }

  validateInput(input) {
    return ArrayHelpers.find(this.errors, { item: input }) ? true : false
  }

}

module.exports = BaseModel

