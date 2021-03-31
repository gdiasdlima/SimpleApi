import { resolve } from "node:path"
import { User } from "../../domain/models/user"
import { CreateUserUseCase } from "../../domain/useCases/createUser"

export const makeCreateUserUseCase = (): CreateUserUseCase => {

    class CreateUserUseCaseStub implements CreateUserUseCase {
        async create(user: User): Promise<User> {

            return new Promise(resolve => resolve({ name: "any_name", password: "any_password" }))
        }
    }

    return new CreateUserUseCaseStub()
}