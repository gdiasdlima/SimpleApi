import { Encrypter } from "../../data/contracts/encrypter";
import bcrypt from 'bcrypt'
export class Bcrypt implements Encrypter {

    constructor(private readonly salt) {

    }

    async encrypt(string: string): Promise<string> {
        return await bcrypt.hash(string, this.salt)
    }
}