import { Validator } from '../../../validation/Validator';
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http';
import { CreateUserUseCase } from '../../domain/useCases/createUser'
import { badRequest, success, serverError } from '../contracts/httpHelper'

export class CreateUserController implements Controller {
    constructor(
        private readonly validator: Validator,
        private readonly createUser: CreateUserUseCase
    ) {

    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)

            if (error) {
                return badRequest(error)
            }
            const { name, password } = httpRequest.body

            const user = await this.createUser.create(
                {
                    name,
                    password
                }
            )

            return success(user)
        }
        catch (error) {
            console.log(error.message)
            return serverError()
        }
    }
}