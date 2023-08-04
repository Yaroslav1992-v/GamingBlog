import {
  createAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch } from "./createStore";
import fileService from "../service/fileService";
import { Post } from "./types";
import { formsProps } from "../Hoc/hooks/usePost.types";
import postService from "../service/postService";

interface PostState {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
}

const initialState: PostState = {
  isLoading: false,
  error: null,
  posts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsRequested: (state: PostState) => {
      state.isLoading = true;
    },
    postCreateRequested: (state: PostState) => {
      state.isLoading = true;
    },
    postCreated: (state: PostState, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
      state.isLoading = false;
    },
    postsReceived: (state: PostState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    postsRequestFailed: (state: PostState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    postEditRequested: (state: PostState) => {
      state.isLoading = true;
    },
    // postEdited: (state: PostState, action: PayloadAction<Post>) => {
    //   const editedPost = action.payload;
    //   const index = state.posts.findIndex((post) => post.id === editedPost.id);
    //   if (index !== -1) {
    //     state.posts[index] = editedPost;
    //   }
    //   state.isLoading = false;
    // },
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
      updatedContent = post.content.map((c) => {
        if (c.contentName === "image") {
          uploadImages.map((img) => {
            if (img.id.toString() === c.id.toString()) {
              c.value = img.url;
              return null;
            }
          });
        }
        return c;
      });
      let newPost: Post = {
        ...post,
        mainImage,
        content: updatedContent.length > 0 ? updatedContent : post.content,
      };
      newPost = await postService.createPost(newPost);

      dispatch(postCreated(newPost));
      return true;
    }
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(postsRequestFailed(message));
  }
};
// export const getPosts = () => async (dispatch: Dispatch) => {
//   try {
//     dispatch(postsRequested());
//     // Fetch posts from API or any other data source
//     const posts = await fetchPostsFromAPI();
//     dispatch(postsReceived(posts));
//   } catch (error: any) {
//     const message = error.response?.data?.message || "Something went wrong";
//     dispatch(postsRequestFailed(message));
//   }
// };

// export const editPost = (post: Post) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(postEditRequested());
//     // Send the edited post to the API or any other data source
//     const editedPost = await sendEditedPostToAPI(post);
//     dispatch(postEdited(editedPost));
//     return true;
//   } catch (error: any) {
//     const message = error.response?.data?.message || "Something went wrong";
//     dispatch(postsRequestFailed(message));
//   }
// };
export const getPostIsLoading = () => (state: { post: PostState }) => {
  return state.post.isLoading;
};
const { reducer: postReducer, actions } = postSlice;
const {
  postsRequested,
  postsReceived,
  postsRequestFailed,
  postCreateRequested,
  postEditRequested,
  postCreated,
  //   postEdited,
} = actions;

export default postReducer;
