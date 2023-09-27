import { Router } from "express";
import { UserController } from "../controllers";
import { IRoutes } from "../types";
import { body, param } from "express-validator";
import { expressValidate, validateSignIn, validateSignup, validateUserId } from "../utils";
import { authenticationMiddleware } from "../middlewares";

export class UserRoutes implements IRoutes {
  public path = "/user";
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initialize();
  }
  initialize = () => {
    this.router.get(`${this.path}`, authenticationMiddleware, this.controller.getAll);
    this.router.get(`${this.path}/:id`, [expressValidate(validateUserId), authenticationMiddleware], this.controller.getById);
    this.router.post(`${this.path}`, expressValidate(validateSignup), this.controller.signup);
    this.router.post(`${this.path}/signin`, expressValidate(validateSignIn), this.controller.signIn);
  };
}
