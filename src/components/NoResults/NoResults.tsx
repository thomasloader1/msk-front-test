import React, { FC } from "react";

const NoResults: FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <img
        src="/src/images/icons/no_results.svg"
        width="47"
        height="47"
        className="mx-auto"
      />
      <h4 className="text-center text-[18px] w-full font-medium">
        No hay resultados para tu búsqueda
      </h4>
      <p className="text-center text-[12px] leading-4">
        Elige otra opción e infórmate en Medical & Scientific Knowledge
      </p>
    </div>
  );
};

export default NoResults;
