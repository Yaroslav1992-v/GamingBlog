import React from "react";
import { tagListProps } from "./tagListProps";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

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
            {removable ? (
              <>
                <div className="tags__tag">{t.tagName}</div>
                <button
                  type="button"
                  onClick={() => action(t.tagName)}
                  className="tags__remove"
                >
                  <AiOutlineClose />
                </button>
              </>
            ) : (
              <Link className="tags__tag" to={`/tags/${t.tagName}/${t._id}`}>
                {t.tagName}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
