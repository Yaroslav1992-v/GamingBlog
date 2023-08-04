import { PostData } from "../Hoc/hooks/usePost.types";
import { Post, UserData } from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/posts/";
const postService = {
  createPost: async (post: PostData): Promise<Post> => {
    const { data } = await httpService.post(apiEndPoint + `create`, post);
    return data;
  },
  //   editUser: async (user: UserData): Promise<UserData> => {
  //     const { data } = await httpService.patch(`${apiEndPoint}edit`, {
  //       ...user,
  //     });
  //     return data;
  //   },
};

export default postService;
