import { ObjectHelpers, ArrayHelpers } from '@igortrindade/lazyfy'
import validators from '@/util/functions/validators'
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


  get errors() {
    return this.requireds.filter((req) => {

      if (typeof (req.validation) === 'function') {
        return req.validation(this[req.item], this)
      } else if (typeof(req.validation) === 'string') {
        if(validators[req.validation]) {
          return this.validateItemString(req.validation, this[req.item])
        }
      } else if (Array.isArray(req.validation)) {
        for(const validationStringRefference of req.validation) {
          if(this.validateItemString(validationStringRefference, this[req.item])) return true
        }
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

  get errorPhrase() {
    return {
      init: 'Por favor, verifique os itens ',
      end: ' para continuar.'
    }
  }

  get validationPhrase() {
    return this.errorPhrase.init + this.errors.map((erro) => erro.label).join(', ') + this.errorPhrase.end
  }

  get validationPhraseHtml() {
    return `${this.errorPhrase.init} <b>${this.errors.map((erro) => erro.label).join(', ')}</b> ${this.errorPhrase.end}`
  }

  validateItemString(validationStringRefference, itemValue) {
    const [value, arg] = validationStringRefference.split(':')
    if(!arg) return validators[value](itemValue)
    return validators[value](itemValue, arg)
  }

  validateInput(input) {
    return ArrayHelpers.find(this.errors, { item: input }) ? true : false
  }

}

module.exports = BaseModel

