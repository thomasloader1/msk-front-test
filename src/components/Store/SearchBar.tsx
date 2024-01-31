import React, { FC } from "react";

const SearchBar: FC<{
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleSearchInput }) => {
  return (
    <div className="corse-bar-wrapper grid-area-search">
      <div className="bar-search ">
        <form action="#">
          <div className="bar-search-icon">
            <i className="flaticon-search"></i>
            <input
              type="text"
              placeholder="Buscar"
              onChange={handleSearchInput}
            />
            <button type="submit">
              <i className="far fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
