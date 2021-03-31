import { Validator } from "../../../../validation/Validator"
import { ValidatorComposite } from "../../../../validation/validator/validatorComposite"
import { RequiredFieldValidator } from '../../../../validation/validator/requiredField'

export const makeCreateUserValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  const requiredFields = ['name', 'password']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidator(field))
  }

  return new ValidatorComposite(validations)
}