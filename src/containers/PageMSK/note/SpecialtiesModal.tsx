import api from "Services/api";
import axios from "axios";
import NcImage from "components/NcImage/NcImage";
import { API_BACKEND_URL } from "data/api";
import { ContactUs, Newsletter, Specialty } from "data/types";
import useSpecialitiesPosts from "hooks/useSpecialitiesPosts";

import { FC, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

interface Props {
  email?: string;
  setShow: (state: boolean) => void;
}
const SpecialtiesModal: FC<Props> = ({ email, setShow }) => {
  const { allSpecialtiesGroups, loading } = useSpecialitiesPosts();
  const history = useHistory();
  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {loading ? (
        <>
          {loadingArray.map((i) => (
            <div
              key={`loading_${i}`}
              className="flex items-center justify-between"
            >
              <div
                role="status"
                className="flex items-center justify-center h-12 w-12 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              ></div>
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </>
      ) : (
        allSpecialtiesGroups.map(
          ({ speciality_name, image, articles }, index) => (
            <Link
              to={`/archivo?especialidad=${speciality_name}`}
              key={`sp__${index}`}
              className="grid grid-cols-4 gap-12 items-center"
            >
              <NcImage
                containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-12 lg:w-12"
                src={image}
              />
              <p className="flex flex-col col-span-3">
                <span className="text-sm"> {speciality_name ?? "Otras"}</span>
                <span className="text-xs">{articles} artículos</span>
              </p>
            </Link>
          )
        )
      )}
    </div>
  );
};

export default SpecialtiesModal;
