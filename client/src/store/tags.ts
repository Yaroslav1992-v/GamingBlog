import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Tags } from "./types";
import tagsService from "../service/tagsService";

interface TagState {
  tags: Tags[];
  isLoading: boolean;
  error: string | null;
  searchedTags: Tags[];
}

const initialState: TagState = {
  tags: [],
  isLoading: false,
  error: null,
  searchedTags: [],
};

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    tagsCreateRequested: (state: TagState) => {
      state.isLoading = true;
    },
    tagsCreated: (state: TagState, action: PayloadAction<Tags[]>) => {
      state.tags = action.payload;
      state.isLoading = true;
    },
    tagsRequested: (state: TagState) => {
      state.isLoading = true;
      state.tags = [];
    },
    tagsRecieved: (state: TagState, action: PayloadAction<Tags[]>) => {
      state.tags = action.payload;
      state.isLoading = false;
    },
    tagsFail: (state: TagState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    searchTagsRequested: (state: TagState) => {
      state.isLoading = true;
    },
    searchTagsCompleted: (state: TagState, action: PayloadAction<Tags[]>) => {
      if (state.searchedTags.length > 0) {
        const tags = [
          ...state.searchedTags,
          ...action.payload.filter(
            (t) => !state.searchedTags.some((tag) => tag.tagName === t.tagName)
          ),
        ];
        state.searchedTags = tags;
      } else {
        state.searchedTags = action.payload;
      }
      state.isLoading = false;
    },
  },
});
export const createTags = (tags: string[]) => async (dispatch: Dispatch) => {
  try {
    dispatch(tagsCreateRequested());
    const data = await tagsService.createTags(tags);
    dispatch(tagsCreated(data));
    if (data) {
      return data.map((d) => d._id);
    } else return [];
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(tagsFail(message));
  }
};
export const loadTags = (tags: string[]) => async (dispatch: Dispatch) => {
  try {
    dispatch(tagsRequested());
    const data = await tagsService.findTagsByIds(tags);
    dispatch(tagsRecieved(data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(tagsFail(message));
  }
};

export const increaseTag = (data: string[]) => async (dispatch: Dispatch) => {
  try {
    await tagsService.increaseNumber(data);
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(tagsFail(message));
  }
};
export const decreaseTag = (data: string[]) => async (dispatch: Dispatch) => {
  try {
    await tagsService.decreaseNumber(data);
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(tagsFail(message));
  }
};
export const searchTag = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(searchTagsRequested());
    const data = await tagsService.searchTags(name);
    dispatch(searchTagsCompleted(data));
    return true;
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(tagsFail(message));
  }
};
export const getSearchedTags = () => (state: { tags: TagState }) => {
  return state.tags.searchedTags;
};
export const getTags = () => (state: { tags: TagState }) => {
  return state.tags.tags;
};
const { reducer: tagsReducer, actions } = tagSlice;
export const {
  tagsCreated,
  tagsRecieved,
  tagsRequested,
  tagsFail,
  tagsCreateRequested,
  searchTagsCompleted,
  searchTagsRequested,
} = actions;

export default tagsReducer;
