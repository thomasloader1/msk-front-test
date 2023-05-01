import { FC, useReducer } from "react";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";

const initialState = {
  isActive: false,
  isActiveA: false,
  isActiveB: false,
  isActiveC: false,
  isActiveD: false,
  isActiveE: false,
};
const reducer = (state: any, action: any) => {
  switch (action) {
    case "categories":
      return {
        ...state,
        isActive: !state.isActive,
      };
    case "ratings":
      return {
        ...state,
        isActiveA: !state.isActiveA,
      };
    case "price":
      return {
        ...state,
        isActiveB: !state.isActiveB,
      };
    case "durations":
      return {
        ...state,
        isActiveE: !state.isActiveE,
      };
    default:
      throw new Error("Unexpected action");
  }
};

interface Props {
  professions: Profession[];
  specialties: Specialty[];
  onChangeSpecialty: (specialty: Specialty) => void;
  onChangeProfession: (profession: Profession) => void;
  onChangeResource: (resource: ResourceFilter) => void;
  onChangeDuration: (duration: DurationFilter) => void;
}

const StoreSideBar: FC<Props> = ({
  professions,
  specialties,
  onChangeSpecialty,
  onChangeProfession,
  onChangeResource,
  onChangeDuration,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const resources: ResourceFilter[] = [
    { name: "Curso", id: 1 },
    { name: "E-book", id: 2 },
  ];

  const duration = [
    { name: "Hasta 100 horas", id: 1, value: "less_100" },
    { name: "De 100 a 300 horas", id: 2, value: "100_300" },
    { name: "Más de 300 horas", id: 3, value: "more_300" },
  ];

  return (
    <>
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            state.isActive ? "content-visiable" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={() => dispatch("categories")}>
            Especialidades
          </h3>
          <ul>
            {specialties.map((specialty, index) => {
              return (
                <li key={`spe_${index}`}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={`specialty_${specialty.id}`}
                      onChange={(event) => onChangeSpecialty(specialty)}
                    />
                    <label
                      className="edu-check-label"
                      htmlFor={`specialty_${specialty.id}`}
                    >
                      {specialty.name}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            state.isActiveA ? "content-visiable" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={() => dispatch("ratings")}>
            Recurso
          </h3>
          <ul>
            {resources.map((resource, index: number) => {
              return (
                <li key={index}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={`res_${resource.id}`}
                      onChange={(event) => onChangeResource(resource)}
                    />
                    <label
                      className="edu-check-label"
                      htmlFor={`res_${resource.id}`}
                    >
                      {resource.name}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            state.isActiveB ? "content-visiable" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={() => dispatch("price")}>
            Profesión
          </h3>
          <ul>
            {professions.map((profession, index: number) => {
              return (
                <li key={index}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={`profession_${profession.id}`}
                      onChange={(event) => onChangeProfession(profession)}
                    />
                    <label
                      className="edu-check-label"
                      htmlFor={`profession_${profession.id}`}
                    >
                      {profession.name}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            state.isActiveE ? "content-visiable" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={() => dispatch("durations")}>
            Duración
          </h3>
          <ul>
            {duration.map((item, index) => {
              return (
                <li key={`dur_${index}`}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={`dur_${item.id}`}
                      onChange={(event) => onChangeDuration(item)}
                    />
                    <label
                      className="edu-check-label"
                      htmlFor={`dur_${item.id}`}
                    >
                      {item.name}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StoreSideBar;
