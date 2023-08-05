import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/createStore";
import { useParams } from "react-router-dom";
import { getPost, loadPost } from "../../store/post";
import { Box } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { useSelector } from "react-redux";
import { PostUser } from "./PostUser";
import { PostContent } from "./PostContent";
import { PostTitle } from "./PostTitle";
import { PostImage } from "./PostImage";

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const { mode } = useApp();
  const { postId } = useParams();
  const post = useSelector(getPost());
  useEffect(() => {
    if (postId) {
      dispatch(loadPost(postId));
    }
  }, [postId]);
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
        </div>
      )}
    </Box>
  );
};
