import React from "react";
import { SearchIcon } from "../icons";

export const Search = () => {
  return (
    <div className="navigation__search">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search"
        className="navigation__search-field"
      />
    </div>
  );
};
