import { HttpResponse } from "./http"
import { ServerError } from "../errors/serverError"

export const badRequest = (error: any): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const success = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
})
