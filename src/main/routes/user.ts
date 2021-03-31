import { Router } from "express";
import { adaptRouter } from "../adapters/expressAdapter";
import { makeCreateUserController } from "../factories/controllers/createUserControllerFactory";

export default (router: Router): void => {

    router.post('/create',adaptRouter(makeCreateUserController()))
}