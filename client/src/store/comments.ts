import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { CommentData, createCommentData } from "./types";
import commentsService from "../service/comments.service";

interface CommentsState {
  isLoading: boolean;
  error: string | null;
  getPostError: string | null;
  dataLoaded: boolean;
  comments: CommentData[];
}
const initialState: CommentsState = {
  isLoading: false,
  error: null,
  dataLoaded: false,
  getPostError: null,
  comments: [],
};

export const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state: CommentsState) => {
      state.dataLoaded = false;
    },
    commentsCreateRequested: (state: CommentsState) => {
      state.isLoading = true;
    },
    commentsCreateSucceded: (
      state: CommentsState,
      action: PayloadAction<CommentData>
    ) => {
      state.isLoading = false;
      state.comments.unshift(action.payload);
    },
    commentsReceived: (
      state: CommentsState,
      action: PayloadAction<CommentData[]>
    ) => {
      state.dataLoaded = true;
      state.comments = action.payload;
      state.isLoading = false;
    },
    commentsRemoved: (state: CommentsState, action: PayloadAction<string>) => {
      const comments = state.comments.filter((c) => c._id !== action.payload);
      state.comments = comments;
    },
    commentsEdited: (
      state: CommentsState,
      action: PayloadAction<CommentData>
    ) => {
      const index = state.comments.findIndex(
        (c) => c._id === action.payload._id
      );
      state.comments[index] = action.payload;
    },
    commentsCreateFailed: (
      state: CommentsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (
      state: CommentsState,
      action: PayloadAction<string>
    ) => {
      state.getPostError = action.payload;
      state.isLoading = false;
    },
  },
});
export const createComment =
  (comment: createCommentData) => async (dispatch: Dispatch) => {
    try {
      dispatch(commentsCreateRequested());
      const newComment = await commentsService.createComments(comment);
      dispatch(commentsCreateSucceded(newComment));
      return newComment._id;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(commentsCreateFailed(message));
    }
  };
export const removeComment =
  (commentId: string) => async (dispatch: Dispatch) => {
    try {
      await commentsService.removeComment(commentId);
      dispatch(commentsRemoved(commentId));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(commentsRequestFailed(message));
    }
  };
export const editComment =
  (commentId: string, data: string) => async (dispatch: Dispatch) => {
    try {
      const editedComment = await commentsService.editComment(commentId, data);
      dispatch(commentsEdited(editedComment));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(commentsRequestFailed(message));
    }
  };
export const loadComments = (postId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(commentsRequested());
    const data = await commentsService.getComments(postId);
    dispatch(commentsReceived(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(commentsRequestFailed(message));
  }
};

export const getComments =
  () =>
  (state: { comment: CommentsState }): CommentData[] => {
    return state.comment.comments;
  };

export const getCommentsIsLoading =
  () =>
  (state: { comment: CommentsState }): boolean =>
    state.comment.isLoading;

const { reducer: commentsReducer, actions } = CommentsSlice;
const {
  commentsRequested,
  commentsCreateRequested,
  commentsCreateSucceded,
  commentsCreateFailed,
  commentsReceived,
  commentsRequestFailed,
  commentsRemoved,
  commentsEdited,
} = actions;

export default commentsReducer;
