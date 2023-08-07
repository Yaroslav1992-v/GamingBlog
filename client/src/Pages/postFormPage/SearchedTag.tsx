import React from "react";
import { Tags } from "../../store/types";

export const SearchedTag = ({
  tags,
  selectTag,
}: {
  tags: Tags[] | string;
  selectTag: (tag: Tags | string) => void;
}) => {
  return (
    <ul className="post-form__searched">
      {typeof tags === "string" ? (
        <li className="post-form__searched-tag">
          <button onClick={() => selectTag(tags)} className="post-form__tagBtn">
            {tags}
          </button>
        </li>
      ) : (
        tags.map((t) => (
          <li key={t._id} className="post-form__searched-tag">
            <button
              type="button"
              onClick={() => selectTag(t)}
              className="post-form__tagBtn"
            >
              {t.tagName}
            </button>
            <span className="post-form__tagNum">{t.postsNumber}</span>
          </li>
        ))
      )}
    </ul>
  );
};
