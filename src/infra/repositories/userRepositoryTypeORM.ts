import { getRepository } from "typeorm";
import { UserRepository } from "../../data/contracts/UserRepository";
import { UserModel } from "../../data/models/user";

export class UserRepositoryTypeORM implements UserRepository {


    async create(user: UserModel): Promise<UserModel>{
        const userRepository = getRepository(UserModel)
    
        return await userRepository.save(user)
    }
}