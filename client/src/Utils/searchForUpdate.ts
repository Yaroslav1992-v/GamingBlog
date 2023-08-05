import { formsProps } from "../Hoc/hooks/usePost.types";
import { Post, PostWithUser } from "../store/types";

export const searchForUpdate = (
  post: Post,
  oldPost: PostWithUser
): {
  imagesToDelete: string[];
  imagesToUpload: formsProps[];
} => {
  const imagesToDelete: string[] = [];
  const imagesToUpload: formsProps[] = post.content.filter(
    (p) => p.contentName === "image" && typeof p.value !== "string"
  );
  let check: boolean;
  for (let i = 0; i < oldPost.content.length; i++) {
    if (oldPost.content[i].contentName !== "image") {
      continue;
    }
    check = false;
    for (let k = 0; k < post.content.length; k++) {
      if (post.content[k].contentName === "image") {
        if (post.content[k].value === oldPost.content[i].value) {
          check = true;
          break;
        }
      }
    }

    if (!check) {
      imagesToDelete.push(oldPost.content[i].value as string);
    }
  }
  return { imagesToDelete, imagesToUpload };
};
export const updateContent = (
  post: Post,
  uploadedImages: {
    url: string;
    id: string;
  }[]
): formsProps[] => {
  const updatedContent = post.content.map((c) => {
    if (c.contentName === "image") {
      uploadedImages.map((img) => {
        if (img.id.toString() === c.id.toString()) {
          c.value = img.url;
          return null;
        }
      });
    }
    return c;
  });
  return updatedContent;
};
