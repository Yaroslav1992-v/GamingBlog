import React from "react";
import { formsPlusProps } from "./addPostProps";
import { AiOutlineClose } from "react-icons/ai";
import { BsFileImage } from "react-icons/bs";
import { ActionBtn, Button, Spinner } from "../../Components";
import { usePosts } from "../../Hoc/hooks/usePost";
import { formsProps } from "../../Hoc/hooks/usePost.types";
import { getPostIsLoading } from "../../store/post";
import { useSelector } from "react-redux";
import { PostFormTextArea } from "./PostFormTextArea";
import { PostFormImage } from "./PostFormImage";
export const PostForm = ({
  postData,
  handleData,
  forms,
  onChange,
  handleImage,
  cancelForm,
  submit,
  formText,
}: formsPlusProps) => {
  const { imageError, handleSumbit, activateField, errors } = usePosts();
  const postIsLoading = useSelector(getPostIsLoading());
  const renderForms = ({ contentName, id, value }: formsProps, i: number) => {
    if (imageError.image && !value)
      return <p className="post-form__error">Error:{imageError.image}</p>;
    else if (contentName !== "image") {
      return (
        <PostFormTextArea
          key={i}
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
          <div key={i} className="post-form__preview">
            <img
              src={
                typeof value === "string"
                  ? value
                  : URL.createObjectURL(value as File)
              }
              alt="preview"
            />
            <ActionBtn
              onChange={handleImage}
              onClick={activateField as () => void}
              id={id}
              name="image"
              Icon={<BsFileImage />}
              text="Change Image"
              type="fileField"
            />
            {postIsLoading ? (
              <Spinner />
            ) : (
              <button
                onClick={() => cancelForm(contentName, id)}
                className="post-form__cancel"
                type="button"
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
        )
      );
    }
  };
  return (
    <form onSubmit={submit} className="post-form__form">
      {
        <>
          <PostFormImage
            error={errors?.mainImage || imageError.mainImage}
            onChange={handleImage}
            image={
              postData.mainImage
                ? typeof postData.mainImage === "string"
                  ? postData.mainImage
                  : URL.createObjectURL(postData.mainImage as File)
                : ""
            }
          />
          <PostFormTextArea
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
        <Button type="submit" size={"l"} text={formText} />
      )}
    </form>
  );
};
