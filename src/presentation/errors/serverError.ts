export class ServerError extends Error {
    constructor () {
      super('Erro interno no servidor.')
    }
  }