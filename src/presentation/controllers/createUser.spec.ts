import { User } from "../../domain/models/user";
import { CreateUserUseCase } from "../../domain/useCases/createUser";
import { makeCreateUserUseCase } from "../../tests/factories/createUseCaseFactory";
import { makeValidator } from "../../tests/factories/validatorFactory";
import { Validator } from "../../validation/Validator";
import { HttpRequest } from "../contracts/http";
import { badRequest, serverError, success } from "../contracts/httpHelper";
import { MissingParamError } from "../errors/missingParamError";
import { CreateUserController } from "./createUser";

interface SutTypes {
    validator: Validator,
    createUserUseCase: CreateUserUseCase
    sut: CreateUserController
}

const makeRequest = (): HttpRequest => ({
    body: makeUser()

})
const makeUser = (): User => ({
    name: 'any_name',
    password: 'any_password'
})

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const createUserUseCase = makeCreateUserUseCase()

    return { validator, createUserUseCase, sut: new CreateUserController(validator, createUserUseCase) }
}

describe("CreateUserController", () => {
    test("Garantir que o validate está sendo chamada com os valores corretos", async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeUser())
    })
    test('Garantir que o useCase está sendo chamado com os valores corretos', async () => {
        const { sut, createUserUseCase } = makeSut()
        const executeSpy = jest.spyOn(createUserUseCase, 'create')
        await sut.handle(makeRequest())
        expect(executeSpy).toHaveBeenCalledWith(makeUser())
    })
    test('Garantir que se o validator falhar retorne badRequest', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockReturnValueOnce(new Error())
        const httpReponse = await sut.handle(makeRequest())
        expect(httpReponse).toEqual(badRequest(new Error()))
    })
    test('Garantir que se o useCase retornar uma exceção retorne serverError', async () => {
        const { sut, createUserUseCase } = makeSut()
        jest.spyOn(createUserUseCase, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpReponse = await sut.handle(makeRequest())
        expect(httpReponse).toEqual(serverError())
    })
    test('Garantir que se o validator retornar uma exceção retorne serverError', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const httpReponse = await sut.handle(makeRequest())
        expect(httpReponse).toEqual(serverError())
    })
    test('Garantir que o usuario foi criado e retornado', async () => {
        const { sut } = makeSut()
        const httpReponse = await sut.handle(makeRequest())
        expect(httpReponse).toEqual(success(makeUser()))
    })
})