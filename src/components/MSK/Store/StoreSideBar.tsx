import {FC, useContext, useEffect, useReducer, useState} from "react";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import {useStoreFilters} from "@/context/storeFilters/StoreFiltersProvider";
import {slugifySpecialty} from "@/lib/Slugify";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {DataContext} from "@/context/data/DataContext";
import Link from "next/link";
import {
  addFilterNew,
  filterSpecialtiesAux,
  getFilters,
  isSpecialtySelected,
  setFilterSpecialty,
} from "@/lib/storeFilters";
import specialtiesMapping from "../../../data/jsons/__specialties.json";
import reducer, {State} from "@/context/storeFilters/storeFiltersReducer";

interface Props {
  onChangeSpecialty: (specialty: any) => void;
  onChangeProfession: (profession: Profession) => void;
  onChangeResource: (resource: ResourceFilter) => void;
  onChangeDuration: (duration: DurationFilter) => void;
  professions: Profession[];
  specialties: Specialty[];
}

const StoreSideBar: FC<Props> = ({
                                   onChangeSpecialty,
                                   onChangeProfession,
                                   onChangeResource,
                                   onChangeDuration,
                                   professions,
                                   specialties,
                                 }) => {
  const router = useRouter();
  const [currentSpecialty, setCurrentSpecialty] = useState<
    Specialty | string | null
  >();
  const setSpecialtyFilter = (specialty: Specialty) => {
    const specialtySlug = slugifySpecialty(specialty.name);
    console.log("SPECIALTY CLICKEADA", specialty);
    console.log("SPECIALTYSLUG", specialtySlug);
    if (currentSpecialty == specialtySlug) {
      console.log("LIMPIO", currentSpecialty, specialtySlug);
      setCurrentSpecialty(null);
      onChangeSpecialty(null);
      //router.push(`?recurso=curso`);
    } else {
      console.log("CAMBIO", currentSpecialty, specialtySlug);
      setCurrentSpecialty(specialtySlug);
      onChangeSpecialty(specialty);
      //router.push(`?especialidad=${specialtySlug}&recurso=curso`);
    }

  };

  const updateResults = () => {
    const params = new URLSearchParams(window.location.search);
    const specialtySlug = params.get("especialidad");
    if (specialtySlug && specialtySlug !== currentSpecialty) {
      const specialtyName =
        specialtiesMapping[specialtySlug as keyof typeof specialtiesMapping];
      setSpecialtyFilter({name: specialtyName});
    }
  }

  if (typeof window != "undefined") {
    useEffect(() => {
      updateResults();
    }, [window.location.search]);
  }
  return (
    <>
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info`}
          // ${ state.isActive ? "content-visiable" : "content-hidden" }
        >
          <h3 className="drop-btn">Especialidades</h3>
          {specialties && specialties.length ? (
            <ul>
              {specialties.map((specialty, index) => {
                return (
                  <li key={`spe_${index}`}>
                    <div className="course-sidebar-list">
                      <input
                        className="edu-check-box"
                        type="checkbox"
                        id={`specialty_${specialty.name}`}
                        onChange={() => setSpecialtyFilter(specialty)}
                        checked={
                          currentSpecialty == slugifySpecialty(specialty.name)
                        }
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
          ) : null}
        </div>
      </div>
      {/* <div className="course-sidebar-widget mb-2">
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
          {professions.length ? (
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
          ) : null}
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
      </div> */}
    </>
  );
};

export default StoreSideBar;
