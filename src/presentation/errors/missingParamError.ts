export class MissingParamError extends Error {
    constructor (field: string) {
      super(`${field} é um campo obrigatório.`)
    }
  }