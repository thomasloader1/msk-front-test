import React, { FC } from "react";

const ShowingItems: FC<{ length: number }> = ({ length }) => {
  return (
    <div className="curse-tab-left-wrap">
      <div className="course-results">
        Mostrando {length > 18 ? 18 : length} de {length} resultados
      </div>
    </div>
  );
};

export default ShowingItems;
