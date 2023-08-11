import React, { useRef } from "react";
import { SearchIcon } from "../icons";
import { useNavigate } from "react-router-dom";
export const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchRef.current?.value) {
      navigate(`/search/${searchRef.current.value}`);
    }
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="navigation__search">
      <button type="button" onClick={handleSearch}>
        <SearchIcon />
      </button>

      <input
        ref={searchRef}
        type="text"
        placeholder="Search"
        className="navigation__search-field"
        onKeyDown={handleEnter}
      />
    </div>
  );
};
