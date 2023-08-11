import React from "react";
import { SearHeadProps } from "./searchpage.props";
import { TagsList } from "../../Components";

export const SearchHead = ({ searchType, value }: SearHeadProps) => {
  return (
    <div className="searchPage__head">
      {searchType === "tag" ? (
        <TagsList
          tags={[{ tagName: value, _id: value, postsNumber: 0 }]}
          removable={false}
        />
      ) : (
        ""
      )}
    </div>
  );
};
