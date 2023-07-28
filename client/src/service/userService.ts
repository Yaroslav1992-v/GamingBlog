import { UserData } from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/user/";
const userService = {
  loadCurrentUser: async (id: string): Promise<UserData> => {
    const { data } = await httpService.get(`${apiEndPoint}getById/${id}`, {});
    return data;
  },
  //   editUser: async (user: User): Promise<User> => {
  //     const { data } = await httpService.patch(`${apiEndPoint}edit`, {
  //       ...user,
  //     });
  //     return data;
  //   },
};

export default userService;
