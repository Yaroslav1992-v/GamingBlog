import React from "react";
import { tagListProps } from "./tagListProps";
import { AiOutlineClose } from "react-icons/ai";

export const TagsList = ({
  tags,
  removable,
  action = () => {},
}: tagListProps) => {
  return (
    <div className="tags">
      <ul className="tags__list">
        {tags.map((t) => (
          <li key={t.tagName} className="tags__item">
            <div className="tags__tag">{t.tagName}</div>
            {removable && (
              <button
                type="button"
                onClick={() => action(t.tagName)}
                className="tags__remove"
              >
                <AiOutlineClose />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
