import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/createStore";
import { useParams } from "react-router-dom";
import { getPost, loadPost } from "../../store/post";
import { Box, Comments, TagsList } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { useSelector } from "react-redux";
import { PostUser } from "./PostUser";
import { PostContent } from "./PostContent";
import { PostTitle } from "./PostTitle";
import { PostImage } from "./PostImage";
import { getTags, loadTags } from "../../store/tags";
import { getIsLoggedIn } from "../../store/auth";

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const { mode } = useApp();
  const { postId } = useParams();
  const post = useSelector(getPost());
  const tags = useSelector(getTags());
  const isLoaggedIn = useSelector(getIsLoggedIn());
  useEffect(() => {
    if (postId) {
      dispatch(loadPost(postId));
    }
  }, []);
  useEffect(() => {
    if (post) {
      dispatch(loadTags(post.tags));
    }
  }, [post]);
  return (
    <Box className="post-page" mode={mode}>
      {post && (
        <div className="post-page__container">
          <PostUser
            postId={post._id}
            user={post.user}
            createdAt={post.createdAt}
          />
          <PostImage image={post.mainImage as string} className="main-image" />
          <PostTitle className="main-title" title={post.mainTitle} />
          <PostContent content={post.content} />
          {tags.length > 0 && <TagsList removable={false} tags={tags} />}
          {isLoaggedIn && <Comments />}
        </div>
      )}
    </Box>
  );
};
