import React, { useEffect } from "react";
import { PostForm } from "./PostForm";
import { PostFormActions } from ".";
import { usePosts } from "../../Hoc/hooks/usePost";
import { Box } from "../../Components";
import { useApp } from "../../Hoc/AppLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editPost, getPost, loadPost } from "../../store/post";
import { useAppDispatch } from "../../store/createStore";
import { Post } from "../../store/types";
import { getCurrentUserId } from "../../store/auth";

export const EditPostPage = () => {
  const { mode } = useApp();
  const {
    handleChange,
    handleForms,
    handleImage,
    handleData,
    activateField,
    checkForErrors,
    forms,
    postData,
    cancelForm,
    setForms,
    setPostData,
  } = usePosts();
  const { postId } = useParams();
  const userId = useSelector(getCurrentUserId());
  const navigate = useNavigate();
  const post = useSelector(getPost());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!post && postId) {
      dispatch(loadPost(postId));
    }
    if (post) {
      setForms(post.content);
      setPostData({ mainImage: post.mainImage, mainTitle: post.mainTitle });
    }
  }, [post]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsExist = checkForErrors();
    if (!errorsExist && post) {
      const editedPost: Post = {
        _id: post._id,
        ...postData,
        content: [...forms],
        user: userId || "",
      };

      const check = await dispatch(editPost(editedPost, post));
      if (check) {
        navigate(`/p/${post._id}`);
      }
    } else return;
  };
  return (
    <Box className="post-form" mode={mode}>
      <main>
        {post && (
          <div className="post-form__container">
            <PostFormActions
              activateFileField={activateField as () => void}
              action={handleForms}
              handleImage={handleImage}
              num={forms.length}
            />
            <div className="post-form__post">
              <PostForm
                formText="Edit Post"
                submit={handleSubmit}
                handleData={handleChange}
                postData={postData}
                cancelForm={cancelForm}
                handleImage={handleImage}
                onChange={handleData}
                forms={forms}
              />
            </div>
          </div>
        )}
      </main>
    </Box>
  );
};
