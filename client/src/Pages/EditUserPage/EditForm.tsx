import React, { useState } from "react";
import {
  AvatarField,
  Button,
  Spinner,
  TextArea,
  TextField,
} from "../../Components";
import { useSelector } from "react-redux";
import { UserData } from "../../store/types";
import { Errors } from "../AuthPage/Auth.props";
import { editUser, getAuthError, getAuthLoading } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { validator } from "../../Utils/validator";
import { editValidator } from "../../Utils/validatorConfig";
import { useNavigate } from "react-router-dom";

export const EditForm = ({ user }: { user: UserData }) => {
  const [image, setImage] = useState<File | undefined>();
  const [errors, setErrors] = useState<Errors>();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<UserData>({ ...user });
  const authError = useSelector(getAuthError());
  const navigate = useNavigate();
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const isLoading = useSelector(getAuthLoading());
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<Pick<Errors, "image">>();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0];
    if (file.size >= 3125576) {
      setImageError({ image: "Max File Size is 3mb" });
      return;
    }
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setErrors({
        ...errors,
        image: "Invalid file type. Only JPG, JPEG, and PNG files are allowed.",
      });
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors({});
    interface Data {
      [key: string]: any; // Index signature for string keys
    }
    e.preventDefault();

    const errors = validator(data as Data, editValidator);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const check = await dispatch(editUser(data, image));
      if (check) {
        navigate(`/account/${user._id}`);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <AvatarField
        id={"avatar"}
        onChange={handleImage}
        url={imagePreview || data.image}
        error={imageError?.image}
      />
      <div className="form__container">
        <TextField
          placeholder="Choose New Email"
          name="email"
          onChange={handleChange}
          error={authError || errors?.email}
          type="text"
          value={data.email}
        />
        <TextField
          name="username"
          placeholder="Choose New Username"
          onChange={handleChange}
          error={errors?.username}
          type="text"
          value={data.username}
        />
        <TextArea
          name="info"
          onChange={handleChange}
          placeholder="Write about yourself"
          value={data.info || ""}
        />{" "}
        {isLoading ? (
          <Spinner />
        ) : (
          <Button type="submit" size={"l"} text={"Edit User"} />
        )}{" "}
      </div>
    </form>
  );
};
