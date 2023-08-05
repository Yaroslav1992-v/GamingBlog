import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch } from "./createStore";
import fileService from "../service/fileService";
import { Post, PostMinData, PostWithUser } from "./types";
import { formsProps } from "../Hoc/hooks/usePost.types";
import postService from "../service/postService";
import { searchForUpdate, updateContent } from "../Utils/searchForUpdate";

interface PostState {
  isLoading: boolean;
  error: string | null;
  posts: PostMinData[];
  post: PostWithUser | null;
}

const initialState: PostState = {
  isLoading: false,
  error: null,
  posts: [],
  post: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsRequested: (state: PostState) => {
      state.isLoading = true;
    },
    postRequested: (state: PostState) => {
      state.post = null;
      state.isLoading = true;
    },
    postCreateRequested: (state: PostState) => {
      state.isLoading = true;
    },
    postCreated: (state: PostState, action: PayloadAction<PostMinData>) => {
      state.posts.push(action.payload);
      state.isLoading = false;
    },
    postsReceived: (state: PostState, action: PayloadAction<PostMinData[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    postReceived: (state: PostState, action: PayloadAction<PostWithUser>) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    postsRequestFailed: (state: PostState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    postEditRequested: (state: PostState) => {
      state.isLoading = true;
    },
    postEdited: (state: PostState, action: PayloadAction<PostWithUser>) => {
      state.post = action.payload;
      state.isLoading = false;
    },
  },
});
export const createPost = (post: Post) => async (dispatch: Dispatch) => {
  try {
    dispatch(postCreateRequested());
    let images = post.content.filter((p) => p.contentName === "image");
    let uploadImages = await fileService.uploadFiles(images);
    const mainImage = await fileService.uploadFile(post.mainImage as File);
    let updatedContent: formsProps[] = [];
    if (images) {
      updatedContent = updateContent(post, uploadImages);
      const newPost: Post = {
        ...post,
        mainImage,
        content: updatedContent.length > 0 ? updatedContent : post.content,
      };
      const uploadedPost = await postService.createPost(newPost);
      dispatch(postCreated(uploadedPost));
      return true;
    }
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(postsRequestFailed(message));
  }
};
export const editPost =
  (post: Post, oldPost: PostWithUser) => async (dispatch: Dispatch) => {
    try {
      dispatch(postEditRequested());
      const { imagesToDelete, imagesToUpload } = searchForUpdate(post, oldPost);
      let updatedPost: Post = { ...post };
      if (post.mainImage !== oldPost.mainImage) {
        updatedPost.mainImage = await fileService.uploadFile(
          updatedPost.mainImage as File
        );
      }
      if (imagesToUpload.length > 0) {
        const uploadedImages = await fileService.uploadFiles(imagesToUpload);
        updatedPost = {
          ...updatedPost,
          content:
            uploadedImages.length > 0
              ? updateContent(post, uploadedImages)
              : post.content,
        };
      }
      const editedPost = await postService.editPost(updatedPost);
      dispatch(postEdited(editedPost));
      if (imagesToDelete.length > 0) {
        await fileService.deleteFiles(imagesToDelete);
      }
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(postsRequestFailed(message));
    }
  };
export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(postsRequested());
    const posts = await postService.loadPosts();
    dispatch(postsReceived(posts));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(postsRequestFailed(message));
  }
};

export const loadPost = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(postRequested());
    const post = await postService.loadPost(id);
    dispatch(postReceived(post));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(postsRequestFailed(message));
  }
};
export const getPostIsLoading = () => (state: { post: PostState }) => {
  return state.post.isLoading;
};
export const getPost =
  () =>
  (state: { post: PostState }): PostWithUser | null => {
    return state.post.post;
  };
export const getMinPost = () => (state: { post: PostState }) => {
  return state.post.posts;
};
const { reducer: postReducer, actions } = postSlice;
const {
  postsRequested,
  postRequested,
  postsReceived,
  postReceived,
  postsRequestFailed,
  postCreateRequested,
  postEditRequested,
  postEdited,
  postCreated,
} = actions;

export default postReducer;
