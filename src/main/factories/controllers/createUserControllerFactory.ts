import { CreateUserService } from "../../../data/services/createUser";
import { Bcrypt } from "../../../infra/cryptography/bcrypt";
import { CreateUserController } from "../../../presentation/controllers/createUser";
import { UserRepositoryTypeORM } from "../../../infra/repositories/userRepositoryTypeORM"
import { makeCreateUserValidator } from "../validations/createUserValidatorFactory";

export const makeCreateUserController = (): CreateUserController => {
    const bcrypt = new Bcrypt(12)
    const userRepositoryTypeORM = new UserRepositoryTypeORM()
    const createUserService = new CreateUserService(bcrypt, userRepositoryTypeORM)
    return new CreateUserController(makeCreateUserValidator(), createUserService)
}