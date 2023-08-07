import { formsProps } from "../Hoc/hooks/usePost.types";
import { Post, PostWithUser, Tags } from "../store/types";

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
export const editedTags = (
  tags: string[],
  updatedTags: Tags[]
): {
  newTags: string[];
  oldTags: string[];
  removedTags: string[];
  existedTags: string[];
} => {
  const tagsIds = updatedTags.map((t) => t._id);
  const newTags: string[] = [];
  const oldTags: string[] = [];
  const existedTags: string[] = [];

  const removedTags = tags.filter((t) => !tagsIds.includes(t));
  updatedTags.forEach((t) => {
    if (t._id === "") {
      newTags.push(t.tagName);
    } else {
      if (!tags.includes(t._id)) {
        oldTags.push(t._id);
      } else {
        existedTags.push(t._id);
      }
    }
  });
  return { newTags, oldTags, removedTags, existedTags };
};
export const splitTags = (
  tags: Tags[]
): {
  newTags: string[];
  oldTags: string[];
} => {
  const newTags: string[] = [];
  const oldTags: string[] = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i]._id !== "") {
      console.log(tags[i]);
      oldTags.push(tags[i]._id);
    } else {
      newTags.push(tags[i].tagName);
    }
  }
  return { newTags, oldTags };
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
