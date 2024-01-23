import React, { FC } from "react";

const ShowingItems: FC<{ length: number }> = ({ length }) => {
  return (
    <div className="curse-tab-left-wrap">
      <div className="course-results">
        Mostrando{" "}
        <span className="course-result-showing">
          {length > 18 ? 18 : length}
        </span>{" "}
        de <span className="course-result-number">{length}</span> resultados
      </div>
    </div>
  );
};

export default ShowingItems;
