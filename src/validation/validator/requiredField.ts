import { MissingParamError } from '../../presentation/errors/missingParamError'
import { Validator } from '../Validator'

export class RequiredFieldValidator implements Validator {
  constructor (private readonly field: string) {}

  validate (data: any): Error {
    if (!data[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}