import { PostData } from "../Hoc/hooks/usePost.types";
import { Post, PostBlogData, PostMinData, PostWithUser } from "../store/types";
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
  loadAllPosts: async (): Promise<PostBlogData[]> => {
    const { data } = await httpService.get(apiEndPoint + "loadAllPosts");
    return data;
  },
  loadPostsByTag: async (tag: string): Promise<PostMinData[]> => {
    const { data } = await httpService.get(
      apiEndPoint + `loadPostsByTag/${tag}`
    );
    return data;
  },
  loadPostsByUserId: async (userId: string): Promise<PostMinData[]> => {
    const { data } = await httpService.get(
      apiEndPoint + `loadPostsByUserId/${userId}`
    );
    return data;
  },
  loadPostsByWord: async (word: string): Promise<PostMinData[]> => {
    const { data } = await httpService.get(
      apiEndPoint + `loadPostsByWord/${word}`
    );
    return data;
  },
  loadPost: async (id: string): Promise<PostWithUser> => {
    const { data } = await httpService.get(apiEndPoint + id);
    return data;
  },
};

export default postService;
