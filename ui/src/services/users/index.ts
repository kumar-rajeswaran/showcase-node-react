import { IApiResponse, IUser } from "types";
import { axiosInstance as http } from "../api";
const get = async (): Promise<IUser[]> => {
  const res = await http.get<IApiResponse<IUser[]>>("user");
  return res.data.data ? res.data.data : [];
};
export const userService = { get };
