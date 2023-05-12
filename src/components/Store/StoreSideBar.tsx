import { FC, useEffect, useReducer, useState } from "react";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import { useStoreFilters } from "context/storeFilters/StoreContext";

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
    const searchQuery = currentUrl.split("?");
    if (searchQuery[1]) {
      let filterTitle = "";
      let filterQuery = "";
      if (searchQuery[1].length) {
        filterTitle = searchQuery[1].split("=")[0];
        filterQuery = searchQuery[1].split("=")[1];
      }

      const filterQueries = filterQuery.split(","); // split the filterQuery at each comma
      const matchingProfessions: Profession[] = [];
      const matchingSpecialties: Specialty[] = [];
      const matchingResources: ResourceFilter[] = [];

      // loop through each filter query to find matching professions and specialties
      filterQueries.forEach((query) => {
        const professionExists = professions.filter(
            (item) => item.slug === query.trim()
        );
        if (professionExists.length) {
          matchingProfessions.push(professionExists[0]);
        } else {
          const specialtiesExists = specialties.filter(
              (item) => item.name === decodeURIComponent(query.trim())
          );
          if (specialtiesExists.length) {
            matchingSpecialties.push(specialtiesExists[0]);
          }else{
            const resourceExists = resources.filter(
                (item) => item.id.toString() === decodeURIComponent(query.trim())
            );
            if (resourceExists.length) {
              matchingResources.push(resourceExists[0]);
            }
          }
        }
      });

      // set the initial load only if there are matching professions or specialties
      if ((matchingProfessions.length || matchingSpecialties.length || matchingResources) && initialLoad) {
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
  }, [onChangeProfession, onChangeSpecialty]);

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
                      checked={isChecked("specialties", specialty)}
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
