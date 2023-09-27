import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  public async getAll(_req: Request, res: Response, next: NextFunction) {
    const getData = await UserService.getInstance().getAll();
    res.status(getData.status).send(getData);
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const getData = await UserService.getInstance().getById(Number(id));
    res.status(getData.status).send(getData);
  }

  public async signup(req: Request, res: Response, next: NextFunction) {
    const getData = await UserService.getInstance().createUser(req.body);
    res.status(getData.status).send(getData);
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const resData = await UserService.getInstance().signin(email, password);
    res.status(resData.status).send(resData);
  }
}
