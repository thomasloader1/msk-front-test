import { FC, useEffect, useReducer, useState } from "react";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import { useStoreFilters } from "context/storeFilters/StoreFiltersProvider";

interface StoreFilterQuery {
  professions: [{ name: string; id: number; slug: string }];
  specialties: [{ name: string; id: number; image?: string }];
  resources: [{ name: string; id: number }];
}

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
  const [initialLoad, setInitialLoad] = useState(true);
  const { storeFilters } = useStoreFilters();

  const resources: ResourceFilter[] = [
    { name: "Curso", id: 1 },
    { name: "Guías profesionales", id: 2 },
  ];

  const duration = [
    { name: "Hasta 100 horas", id: 1, value: "less_100" },
    { name: "De 100 a 300 horas", id: 2, value: "100_300" },
    { name: "Más de 300 horas", id: 3, value: "more_300" },
  ];
  useEffect(() => {
    const currentUrl = window.location.href;
    const searchQuery = currentUrl.split("?")[1];

    if (searchQuery) {
      const queryParams = searchQuery.split("&");
      const matchingProfessions = [{}] as StoreFilterQuery["professions"];
      const matchingSpecialties = [{}] as StoreFilterQuery["specialties"];
      const matchingResources = [{}] as StoreFilterQuery["resources"];

      queryParams.forEach((param) => {
        const [key, value] = param.split("=");
        const decodedValue = decodeURIComponent(value);
        if (key === "profesion" && professions.length) {
          const professionExists = professions.find(
            (item) => item.slug === decodedValue
          );
          if (professionExists) {
            matchingProfessions.push(professionExists);
          }
        } else if (key === "especialidad" && specialties.length) {
          const specialtiesExists = specialties.find(
            (item) => item.name === decodedValue
          );
          if (specialtiesExists) {
            matchingSpecialties.push(specialtiesExists);
          }
        } else if (key === "recurso" && resources.length) {
          const resourceExists = resources.find(
            (item) => item.id.toString() === decodedValue
          );
          if (resourceExists) {
            matchingResources.push(resourceExists);
          }
        }
      });

      if (
        (matchingProfessions.length ||
          matchingSpecialties.length ||
          matchingResources.length) &&
        initialLoad
      ) {
        matchingProfessions.forEach((profession) => {
          onChangeProfession({
            id: profession.id,
            name: profession.name,
            slug: profession.slug,
          });
        });
        matchingSpecialties.forEach((specialty) => {
          onChangeSpecialty({
            id: specialty.id,
            name: specialty.name,
          });
        });
        matchingResources.forEach((resource) => {
          onChangeResource({
            id: resource.id,
            name: resource.name,
          });
        });

        setInitialLoad(false);
      }
    }
  }, [onChangeProfession, onChangeSpecialty, onChangeResource]);

  const isChecked = (type: string, value: any) => {
    switch (type) {
      case "professions":
        return !!storeFilters[type as keyof typeof storeFilters].filter(
          (profession: any) => {
            return profession.slug == value.slug;
          }
        ).length;
      case "specialties":
        return !!storeFilters[type as keyof typeof storeFilters].filter(
          (specialty: any) => {
            return specialty.name == value.name;
          }
        ).length;
      case "resources":
        return !!storeFilters[type as keyof typeof storeFilters].filter(
          (resource: any) => {
            return resource.id == value.id;
          }
        ).length;
    }
  };

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
          {specialties.length && (
            <ul>
              {specialties.map((specialty, index) => {
                return (
                  <li key={`spe_${index}`}>
                    <div className="course-sidebar-list">
                      <input
                        className="edu-check-box"
                        type="checkbox"
                        id={`specialty_${specialty.name}`}
                        onChange={(event) => onChangeSpecialty(specialty)}
                        checked={isChecked("specialties", specialty)}
                      />
                      <label
                        className="edu-check-label"
                        htmlFor={`specialty_${specialty.name}`}
                      >
                        {specialty.name}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
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
                      checked={isChecked("resources", resource)}
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
          {professions.length && (
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
                        checked={isChecked("professions", profession)}
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
          )}
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
