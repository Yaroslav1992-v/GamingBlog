import React from "react";
import { formsPlusProps } from "./addPostProps";
import { AddPostTextArea } from "./AddPostTextArea";
import { AddImagePost } from "./AddImagePost";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Spinner } from "../../Components";
import { usePosts } from "../../Hoc/hooks/usePost";
import { formsProps } from "../../Hoc/hooks/usePost.types";
import { getPostIsLoading } from "../../store/post";
import { useSelector } from "react-redux";
export const AddPostForm = ({
  postData,
  handleData,
  forms,
  onChange,
  handleImage,
  cancelForm,
}: formsPlusProps) => {
  const { imageError, handleSumbit, errors } = usePosts();
  const postIsLoading = useSelector(getPostIsLoading());
  const renderForms = ({ contentName, id, value }: formsProps, i: number) => {
    if (imageError.image && !value)
      return <p className="addPost-page__error">Error:{imageError.image}</p>;
    else if (contentName !== "image") {
      return (
        <AddPostTextArea
          key={id}
          onChange={onChange}
          id={id}
          error={errors?.text}
          value={value}
          contentName={contentName}
        />
      );
    } else {
      return (
        value && (
          <div className="addPost-page__preview">
            <img src={URL.createObjectURL(value as File)} alt="preview" />
            <button
              onClick={() => cancelForm(contentName, id)}
              className="addPost-page__cancel"
              type="button"
            >
              <AiOutlineClose />
            </button>
          </div>
        )
      );
    }
  };
  console.log(postIsLoading);
  return (
    <form onSubmit={handleSumbit} className="addPost-page__form">
      {
        <>
          <AddImagePost
            error={errors?.mainImage || imageError.mainImage}
            onChange={handleImage}
            image={
              postData.mainImage
                ? URL.createObjectURL(postData.mainImage as File)
                : ""
            }
          />
          <AddPostTextArea
            onChange={handleData}
            id={-1}
            value={postData.mainTitle}
            contentName={"mainTitle"}
            error={errors?.mainTitle}
          />
        </>
      }
      {forms.map((f, i) =>
        renderForms({ contentName: f.contentName, id: f.id, value: f.value }, i)
      )}
      {postIsLoading ? (
        <Spinner />
      ) : (
        <Button type="submit" size={"l"} text={"Create Post"} />
      )}
    </form>
  );
};
