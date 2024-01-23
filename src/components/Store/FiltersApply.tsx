import React, { FC } from 'react'

const FiltersApply: FC<{filtersCount: number}> = ({ filtersCount}) => {
  return (
    <div className="bar-filter">
    <i className="flaticon-filter"></i>
    <span>Filtros</span>
    <span>({filtersCount})</span>
  </div>
  )
}

export default FiltersApply