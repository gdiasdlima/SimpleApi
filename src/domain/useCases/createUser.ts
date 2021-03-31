import { User } from "../models/user";

export interface CreateUserUseCase {
    create(user: User) : Promise<User>
}