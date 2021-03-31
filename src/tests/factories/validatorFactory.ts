import { Validator } from "../../../validation/validator"

export const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (value: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}