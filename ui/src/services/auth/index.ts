import { axiosInstance as http } from "../api";
import { ISignInRequest, ISignInResponse } from "types";
import { IApiResponse } from "types";
const login = async (req: ISignInRequest): Promise<string> => {
  const res = await http.post<IApiResponse<string>>("/user/signin", req);
  return res.data.data ? res.data.data : "";
};
const validateToken = async (): Promise<ISignInResponse> => {
  const res = await http.post<IApiResponse<ISignInResponse>>("/user/validate");
  return res.data.data ? res.data.data : {};
};

export const authService = {
  login,
  validateToken,
};
