import React from "react";
import { useApp } from "../../Hoc/AppLoader";
import { Box } from "../../Components";
import { usePosts } from "../../Hoc/hooks/usePost";
import { PostFormActions } from "./PostFormActions";
import { PostForm } from ".";
import { Post } from "../../store/types";
import { useAppDispatch } from "../../store/createStore";
import { getCurrentUserId } from "../../store/auth";
import { useSelector } from "react-redux";
import { createPost } from "../../store/post";
import { useNavigate } from "react-router-dom";
import { splitTags } from "../../Utils/searchForUpdate";
import { createTags, increaseTag } from "../../store/tags";
export const AddPostPage = () => {
  const { mode } = useApp();
  const {
    handleChange,
    handleForms,
    handleImage,
    handleData,
    activateField,
    forms,
    postData,
    cancelForm,
    checkForErrors,
    tags,
  } = usePosts();
  const dispatch = useAppDispatch();
  const userId = useSelector(getCurrentUserId());
  const navigate = useNavigate();
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsExist = checkForErrors();
    if (!errorsExist) {
      const { newTags, oldTags } = splitTags(tags);
      const createNewTags = await dispatch(createTags(newTags));
      console.log(createNewTags);
      dispatch(increaseTag(oldTags));
      let post: Post = {
        ...postData,
        content: [...forms],
        user: userId || "",
        tags: [...oldTags],
      };
      if (createNewTags) {
        post = {
          ...post,
          tags: [...post.tags, ...createNewTags],
        };
      }

      const check = await dispatch(createPost(post));
      if (check) {
        navigate("/");
      }
    } else return;
  };
  return (
    <Box className="post-form" mode={mode}>
      <main>
        <div className="post-form__container">
          <PostFormActions
            activateFileField={activateField as () => void}
            action={handleForms}
            handleImage={handleImage}
            num={forms.length}
          />
          <div className="post-form__post">
            <PostForm
              formText="Create Post"
              submit={handleSumbit}
              handleData={handleChange}
              postData={postData}
              cancelForm={cancelForm}
              handleImage={handleImage}
              onChange={handleData}
              forms={forms}
            />
          </div>
        </div>
      </main>
    </Box>
  );
};
