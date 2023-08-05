import React from "react";
import { useApp } from "../../Hoc/AppLoader";
import { Box } from "../../Components";
import { usePosts } from "../../Hoc/hooks/usePost";
import { PostFormActions } from "./PostFormActions";
import { PostForm } from ".";
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
    handleSumbit,
  } = usePosts();
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
