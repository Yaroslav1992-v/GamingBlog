import React from "react";
import { formsPlusProps } from "./addPostProps";
import { AiOutlineClose } from "react-icons/ai";
import { BsFileImage } from "react-icons/bs";
import { ActionBtn, Button, Spinner, TagsList } from "../../Components";
import { usePosts } from "../../Hoc/hooks/usePost";
import { formsProps } from "../../Hoc/hooks/usePost.types";
import { getPostIsLoading } from "../../store/post";
import { useSelector } from "react-redux";
import { PostFormTextArea } from "./PostFormTextArea";
import { PostFormImage } from "./PostFormImage";
import { PostTagsInput } from "./PostTagsInput";
import { SearchedTag } from "./SearchedTag";
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
  const {
    imageError,
    activateField,
    errors,
    handleSearchQuery,
    filteredTags,
    handleTags,
    searchQuery,
    tags,
    removeTag,
  } = usePosts();
  const postIsLoading = useSelector(getPostIsLoading());
  const renderForms = ({ contentName, id, value }: formsProps, i: number) => {
    if (imageError.image && !value)
      return <p className="post-form__error">Error:{imageError.image}</p>;
    else if (contentName !== "image") {
      return (
        <PostFormTextArea
          key={`form=${i}`}
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
          <div key={`form=${i}`} className="post-form__preview">
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
  const checkIfTagsExists = (query: string) => {
    const index = tags.findIndex((t) => t.tagName === query);
    return index !== -1;
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
      <TagsList action={removeTag} tags={tags} removable={true} />
      <div className="post-form__tags">
        <PostTagsInput
          error={errors?.tags}
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        {filteredTags.length > 0 && searchQuery ? (
          <SearchedTag selectTag={handleTags} tags={filteredTags} />
        ) : (
          searchQuery.length > 0 &&
          !checkIfTagsExists(searchQuery) && (
            <SearchedTag selectTag={handleTags} tags={searchQuery} />
          )
        )}
      </div>
      {postIsLoading ? (
        <Spinner />
      ) : (
        <Button type="submit" size={"l"} text={formText} />
      )}
    </form>
  );
};
