import { IApiResponse, IUserResponse, IUserSignup } from "../types";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { SECRET_KEY, dbConfig } from "../configs";
import { Users } from "../entities";
import { compare, hash } from "bcrypt";

export class UserService {
  private static instance: UserService | null = null;
  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }
  async createUser({ email, firstName, lastName, password }: IUserSignup): Promise<IApiResponse<Partial<Users>>> {
    const checkUser = await dbConfig.getRepository(Users).exist({
      where: {
        email,
      },
    });
    if (checkUser) {
      return new IApiResponse<Partial<Users>>(StatusCodes.CONFLICT, {}, "Users Already Exist!");
    }
    const hashedPassword = await hash(password, 13);
    const userEntity = new Users();
    userEntity.email = email;
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.password = hashedPassword;

    const userRes = await dbConfig.getRepository(Users).save(userEntity);
    if (!userRes) {
      return new IApiResponse<Partial<Users>>(StatusCodes.BAD_REQUEST, {});
    }
    return new IApiResponse<Partial<Users>>(StatusCodes.OK, { email, firstName, id: userRes.id, lastName });
  }

  async getAll(): Promise<IApiResponse<IUserResponse[]>> {
    const users = await dbConfig.getRepository(Users).find();
    if (!users) {
      return new IApiResponse<IUserResponse[]>(StatusCodes.NOT_FOUND, users);
    }
    return new IApiResponse<IUserResponse[]>(
      StatusCodes.OK,
      users.map((it) => ({
        id: it.id,
        email: it.email,
        firstName: it.firstName,
        lastName: it.lastName,
        createdOn: it.createdOn,
      }))
    );
  }
  async getById(id: number): Promise<IApiResponse<IUserResponse>> {
    const user = await dbConfig.getRepository(Users).findOneBy({ id });
    if (!user) {
      return new IApiResponse<IUserResponse>(StatusCodes.NOT_FOUND, user);
    }
    return new IApiResponse<IUserResponse>(StatusCodes.OK, {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdOn: user.createdOn,
    });
  }
  async signin(userEmail: string, password: string): Promise<IApiResponse<string>> {
    const user = await dbConfig.getRepository(Users).findOneBy({
      email: userEmail,
    });
    if (!user) {
      return new IApiResponse<string>(StatusCodes.UNAUTHORIZED, "");
    }
    if (!(await compare(password, user.password))) {
      return new IApiResponse<string>(StatusCodes.UNAUTHORIZED, "");
    }
    const { email, firstName, id, lastName } = user;
    const token = jwt.sign({ email, firstName, id, lastName }, `${SECRET_KEY}`, { expiresIn: "1h" });
    return new IApiResponse<string>(StatusCodes.OK, token);
  }
}
