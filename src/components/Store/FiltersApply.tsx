import React, { FC } from "react";
import sliderIcon from "/images/icons/sliders.svg";
const FiltersApply: FC<{ filtersCount: number }> = ({ filtersCount }) => {
  return (
    <div className="hidden md:flex bar-filter grid-area-filter">
      <img src={sliderIcon} />
      <span>Filtros</span>
      <span>({filtersCount})</span>
    </div>
  );
};

export default FiltersApply;
