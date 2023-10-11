import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";
import { IApiResponse, IUserResponse } from "../types";
import { StatusCodes } from "http-status-codes";

export class UserController {
  public async getAll(_req: Request, res: Response, _next: NextFunction) {
    const getData = await UserService.getInstance().getAll();
    res.status(getData.status).send(getData);
  }

  public async getById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const getData = await UserService.getInstance().getById(Number(id));
    res.status(getData.status).send(getData);
  }

  public async signup(req: Request, res: Response, _next: NextFunction) {
    const getData = await UserService.getInstance().createUser(req.body);
    res.status(getData.status).send(getData);
  }

  public async signIn(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body;
    const resData = await UserService.getInstance().signIn(email, password);
    res.status(resData.status).send(resData);
  }

  public async validate(req: Request, res: Response, _next: NextFunction) {
    const user = req.user as IUserResponse;
    if (user) {
      const resData: IApiResponse<Partial<IUserResponse>> = {
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        status: StatusCodes.OK,
      };
      res.status(resData.status).send(resData);
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send({});
    }
  }
}
