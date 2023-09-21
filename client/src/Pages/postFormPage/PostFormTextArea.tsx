import React, { useRef, useEffect } from "react";
import { PostTextAreaProps } from "./addPostProps";

export const PostFormTextArea = ({
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
    <div className={"post-form__textBox"}>
      <textarea
        ref={textRef}
        name={contentName}
        id={id.toString()}
        value={value as string}
        onChange={handleText}
        className={
          `post-form__textArea post-form__textArea-${contentName} ` +
          (error ? "post-form__textArea-error" : "")
        }
      />
      <span className="post-form__type">{contentName}</span>
      {error && <p className="post-form__error">{error}</p>}
    </div>
  );
};
