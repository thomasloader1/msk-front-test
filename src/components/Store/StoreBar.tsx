import React, { FC, useEffect, useState } from "react";

interface Props {
  onSearch: (searchTerm: string) => void;
  onFilter: (selectedOption: string) => void;
  length: number;
  filtersCount : number;
}

const StoreBar: FC<Props> = ({ onSearch, onFilter, length, filtersCount }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onFilter(event.target.value);
  };
  return (
    <div className=" course-bar-up-area">
      <div className="container">
        <div className="grid grid-cols-1">
          <div className="course-main-wrapper mb-30">
            <div className="bar-filter">
              <i className="flaticon-filter"></i>
              <span>Filtros</span>
              <span>({filtersCount})</span>
            </div>
            <div className="corse-bar-wrapper">
              <div className="bar-search">
                <form action="#">
                  <div className="bar-search-icon position-relative">
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
            <div className="course-sidebar-tab">
              <div className="course-sidebar-wrapper">
                <div className="curse-tab-left-wrap">
                  <div className="course-results">
                    Mostrando{" "}
                    <span className="course-result-showing">
                      {length > 18 ? 18 : length}
                    </span>{" "}
                    de <span className="course-result-number">{length}</span>{" "}
                    resultados
                  </div>
                </div>
                <div className="couse-dropdown">
                  <div className="course-drop-inner">
                    <select onChange={handleSelectOption}>
                      <option value="">Seleccione una opción</option>
                      {/* <option value="newer">Más nuevos</option> */}
                      <option value="duration">Duración</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBar;
