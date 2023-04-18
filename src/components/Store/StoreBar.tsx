import React, { FC, useEffect, useState } from "react";

interface Props {
  onSearch: (searchTerm: string) => void;
}

const StoreBar: FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      props.onSearch(searchTerm);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, props]);

  function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }
  return (
    <div className=" course-bar-up-area">
      <div className="container">
        <div className="grid grid-cols-1">
          <div className="course-main-wrapper mb-30">
            <div className="bar-filter">
              <i className="flaticon-filter"></i>
              <span>Filtros</span>
              <span>(0)</span>
            </div>
            <div className="corse-bar-wrapper">
              <div className="bar-search">
                <form action="#">
                  <div className="bar-secrch-icon position-relative">
                    <input
                      type="text"
                      placeholder="Buscar"
                      value={searchTerm}
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
                    Mostrando <span className="course-result-showing">15</span>{" "}
                    de <span className="course-result-number">60</span>{" "}
                    resultados
                  </div>
                </div>
                <div className="couse-dropdown">
                  <div className="course-drop-inner">
                    <select>
                      <option>Más nuevos</option>
                      <option>Más populares</option>
                      <option>5 Estrellas</option>
                      <option>Duración</option>
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
