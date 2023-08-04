import React from "react";
import { useApp } from "../../Hoc/AppLoader";
import { AddPostForm } from "./AddPostForm";
import { AddPostActions } from "./AddPostActions";
import { Box } from "../../Components";
import { usePosts } from "../../Hoc/hooks/usePost";
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
  } = usePosts();
  return (
    <Box className="addPost-page" mode={mode}>
      <main>
        <div className="addPost-page__container">
          <AddPostActions
            activateFileField={activateField as () => void}
            action={handleForms}
            handleImage={handleImage}
            num={forms.length}
          />
          <div className="addPost-page__post">
            <AddPostForm
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
