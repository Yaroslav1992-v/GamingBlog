import React, { useContext, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AddPostPage } from "../../Pages";
import {
  ImgError,
  PostContextValue,
  PostData,
  PostErrors,
  contentType,
  formsProps,
} from "./usePost.types";
import { validator } from "../../Utils/validator";
import { postValidator } from "../../Utils/validatorConfig";
import { Post } from "../../store/types";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { createPost } from "../../store/post";

const PostContext = React.createContext<PostContextValue>(
  {} as PostContextValue
);

export const usePosts = (): PostContextValue => {
  return useContext(PostContext);
};

export const PostsProvider: React.FC = () => {
  const [errors, setErrors] = useState<PostErrors>();
  const userId = useSelector(getCurrentUserId());
  const [imageError, setImageError] = useState<ImgError>({
    mainImage: "",
    image: "",
  });
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostData>({
    mainImage: "",
    mainTitle: "",
  });
  const [forms, setForms] = useState<formsProps[]>([
    { contentName: "text", value: "", id: 0 },
  ]);
  const dispatch = useAppDispatch();
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPostData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleForms = ({ id, contentName, value }: formsProps) => {
    let len = forms.length;
    if (len > 0) {
      if (
        contentName !== "image" &&
        forms[len - 1].contentName === contentName
      ) {
        return;
      }
      if (!forms[len - 1].value) {
        id--;
        forms.pop();
      }
    }
    const newForms: formsProps[] = [...forms, { contentName, id, value }];
    setForms(newForms);
  };
  const activateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleForms({
      id: forms.length,
      contentName: "image",
      value: "",
    });
  };
  const handleData = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    file?: File
  ) => {
    const updatedContent = [...forms];

    let { id, value, name } = target;
    updatedContent[Number(id)].value = file ? file : value;
    setForms(updatedContent);
    if (!updatedContent[Number(id)].value && !value && Number(id) > 0) {
      const filteredForms = updatedContent.filter((u) => u.id !== Number(id));
      setForms(filteredForms);
    }
  };
  const handleImageError = (kind: "image" | "mainImage", error: string) => {
    setImageError((prevState) => ({
      ...prevState,
      [kind]: error,
    }));
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0];
    let error: string = "";
    if (!file) {
      return;
    }
    if (file.size >= 3125576) {
      error = "Max File Size is 3mb";
    }
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      error = "Invalid file type. Only JPG, JPEG, and PNG files are allowed.";
    }
    if (error) {
      if (e.target.id === "mainImage") {
        handleImageError(e.target.id, error);
        return;
      } else {
        handleImageError("image", error);
        return;
      }
    }
    if (e.target.id === "mainImage") {
      handleImageError(e.target.id, "");
      setPostData((prevState) => ({
        ...prevState,
        mainImage: file,
      }));
      return;
    }
    // URL.createObjectURL(file);
    handleImageError("image", "");
    handleData(e, file);
  };
  const cancelForm = (value: contentType, id: number) => {
    const filteredForms: formsProps[] = forms.filter(
      (f) => f.value !== value && f.id !== id
    );
    if (forms.length - 1 > id) {
      for (let i = id; i < filteredForms.length; i++) {
        filteredForms[i].id -= 1;
      }
    }
    setForms(filteredForms);
  };
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = forms.find((t) => t.contentName === "text" && t.value);
    let errorData: PostErrors = {};
    if (!text) {
      errorData = {
        ...postData,
        text: "",
        mainImage: postData.mainImage ? "ok" : "",
      };
    } else {
      errorData = { ...postData, mainImage: postData.mainImage ? "ok" : "" };
    }
    errorData = validator(errorData as any, postValidator);
    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
      return;
    }
    const post: Post = {
      ...postData,
      content: [...forms],
      userId: userId || "",
    };
    const check = await dispatch(createPost(post));
    if (check) {
      navigate("/");
    }
  };
  const contextValue: PostContextValue = {
    errors,
    imageError: imageError || "",
    postData,
    forms,
    handleChange,
    handleForms,
    activateField,
    handleData,
    handleImage,
    cancelForm,
    handleSumbit,
  };

  return (
    <PostContext.Provider value={contextValue}>
      <Routes>
        <Route index element={<AddPostPage />} />
      </Routes>
    </PostContext.Provider>
  );
};
