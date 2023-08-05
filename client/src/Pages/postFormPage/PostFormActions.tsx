import React from "react";
import { BsChatQuoteFill, BsFillChatTextFill } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { formActions } from "./addPostProps";
import { ActionBtn } from "../../Components";
import { MdTitle } from "react-icons/md";

export const PostFormActions = ({
  action,
  num,
  activateFileField,
  handleImage,
}: formActions) => {
  return (
    <div className="post-form__actions">
      <ActionBtn
        onClick={() => action({ id: num, contentName: "quote", value: "" })}
        Icon={<BsChatQuoteFill />}
        type="button"
        text="Add Quote"
      />
      <ActionBtn
        onClick={activateFileField}
        Icon={<FaImages />}
        type="fileField"
        name="image"
        text="Add Image"
        id={num - 1}
        onChange={handleImage}
      />
      <ActionBtn
        onClick={() =>
          action({
            id: num,
            contentName: "text",
            value: "",
          })
        }
        Icon={<BsFillChatTextFill />}
        type="button"
        text="Add Text"
      />
      <ActionBtn
        onClick={() =>
          action({
            id: num,
            contentName: "title",
            value: "",
          })
        }
        Icon={<MdTitle />}
        type="button"
        text="Add Title"
      />
    </div>
  );
};
