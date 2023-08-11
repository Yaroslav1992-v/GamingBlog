import React, { useEffect } from "react";
import { Box, PostsMinList } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { useParams } from "react-router-dom";
import { SearchHead } from "./SearchHead";
import { useAppDispatch } from "../../store/createStore";
import {
  findPostByWord,
  getPostsByTag,
  getSearchedPosts,
} from "../../store/post";
import { useSelector } from "react-redux";

export const SearchPage = () => {
  const { mode } = useApp();
  const { tagName, tagId, value } = useParams();
  const dispatch = useAppDispatch();
  const posts = useSelector(getSearchedPosts());
  useEffect(() => {
    if (tagId) {
      dispatch(getPostsByTag(tagId));
    }
    if (value) {
      dispatch(findPostByWord(value));
    }
  }, [tagName || value]);
  return (
    <Box className="search-page" mode={mode}>
      <div className="search-page__container">
        <div className="sear-page__inner">
          {tagName ? (
            <SearchHead searchType="tag" value={tagName} />
          ) : value ? (
            <SearchHead searchType="word" value={value} />
          ) : (
            ""
          )}
        </div>
        <div className="search-page__results">
          {value && (
            <div className="search-page__message">
              {"total " + posts?.length + " posts found"}
            </div>
          )}
          {posts && <PostsMinList posts={posts} />}
        </div>
      </div>
    </Box>
  );
};
