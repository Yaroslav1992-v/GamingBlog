import { PostData } from "../Hoc/hooks/usePost.types";
import { Post, PostMinData, PostWithUser } from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/posts/";
const postService = {
  createPost: async (post: PostData): Promise<PostMinData> => {
    const { data } = await httpService.post(apiEndPoint + `create`, post);
    return data;
  },
  editPost: async (post: Post): Promise<PostWithUser> => {
    const { data } = await httpService.patch(`${apiEndPoint}edit`, {
      ...post,
    });
    return data;
  },
  loadPosts: async (): Promise<PostMinData[]> => {
    const { data } = await httpService.get(apiEndPoint + "loadPosts");
    return data;
  },
  loadPost: async (id: string): Promise<PostWithUser> => {
    const { data } = await httpService.get(apiEndPoint + id);
    return data;
  },
};

export default postService;
