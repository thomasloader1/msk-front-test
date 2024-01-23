import React, { FC } from "react";

const FiltersApply: FC<{ filtersCount: number }> = ({ filtersCount }) => {
  return (
    <div className="hidden md:flex bar-filter grid-area-filter">
      <i className="flaticon-filter"></i>
      <span>Filtros</span>
      <span>({filtersCount})</span>
    </div>
  );
};

export default FiltersApply;
