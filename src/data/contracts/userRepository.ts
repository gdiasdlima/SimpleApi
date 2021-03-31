import { UserModel } from "../models/user";

export interface UserRepository {
    create(user: UserModel): Promise<UserModel>
}