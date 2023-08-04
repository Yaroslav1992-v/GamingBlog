import React, { useRef, useEffect } from "react";
import { PostTextAreaProps } from "./addPostProps";

export const AddPostTextArea = ({
  onChange,
  id,
  value,
  contentName = "text",
  error = "",
}: PostTextAreaProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const height = textRef.current!.scrollHeight;
    textRef.current!.style.height = height + "px";
    onChange(e);
  };
  useEffect(() => {
    textRef.current?.focus();
  }, []);
  return (
    <div className={"addPost-page__textBox"}>
      <textarea
        ref={textRef}
        name={contentName}
        id={id.toString()}
        value={value as string}
        onChange={handleText}
        className={
          `addPost-page__textArea addPost-page__textArea-${contentName} ` +
          (error ? "addPost-page__textArea-error" : "")
        }
      />
      <span className="addPost-page__type">{contentName}</span>
      {error && <p className="addPost-page__error">{error}</p>}
    </div>
  );
};
