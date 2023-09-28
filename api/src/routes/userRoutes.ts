import { Router } from "express";
import { UserController } from "../controllers";
import { IRoutes } from "../types";
import { expressValidate, validateSignIn, validateSignup } from "../utils";
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
    this.router.get(`${this.path}/:id`, authenticationMiddleware, this.controller.getById);
    this.router.post(`${this.path}`, expressValidate(validateSignup), this.controller.signup);
    this.router.post(`${this.path}/signin`, expressValidate(validateSignIn), this.controller.signIn);
    this.router.post(`${this.path}/validate`, authenticationMiddleware, this.controller.validate);
  };
}
