import { User } from "../../domain/models/user";
import { CreateUserUseCase } from "../../domain/useCases/createUser";
import { Encrypter } from "../contracts/encrypter";
import { UserRepository } from "../contracts/userRepository"
import { UserModel } from "../models/user";

export class CreateUserService implements CreateUserUseCase {

    constructor(
        private readonly encrypter: Encrypter,
        private readonly userRepository: UserRepository
    ) {}

    async create(data: User): Promise<User> {

        const password = await this.encrypter.encrypt(data.password)

        const user = new UserModel()
        user.name = data.name
        user.password = password

        return await this.userRepository.create(user)
    }
}