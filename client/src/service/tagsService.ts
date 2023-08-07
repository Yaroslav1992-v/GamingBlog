import { PostData } from "../Hoc/hooks/usePost.types";
import { Post, PostMinData, PostWithUser, Tags } from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/tags/";
const tagsService = {
  createTags: async (tags: string[]): Promise<Tags[]> => {
    const { data } = await httpService.post(apiEndPoint + `createTags`, {
      data: tags,
    });

    return data;
  },
  findTagsByIds: async (tags: string[]): Promise<Tags[]> => {
    const { data } = await httpService.post(apiEndPoint + `findTagsByIds`, {
      data: tags,
    });

    return data;
  },
  searchTags: async (tagNme: string): Promise<Tags[]> => {
    const { data } = await httpService.get(apiEndPoint + `search/${tagNme}`);
    return data;
  },
  increaseNumber: async (tags: string[]): Promise<null> => {
    const { data } = await httpService.patch(apiEndPoint + `tagsPlus`, {
      tags,
    });
    return data;
  },
  decreaseNumber: async (tags: string[]): Promise<null> => {
    const { data } = await httpService.patch(apiEndPoint + `tagsMinus`, {
      tags,
    });
    return data;
  },
};

export default tagsService;
