import { FC, useEffect, useState } from "react";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import { slugifySpecialty } from "@/lib/Slugify";
import specialtiesMapping from "../../../data/jsons/__specialties.json";
import resourcesMapping from "../../../data/jsons/__resources.json";
import durationsMapping from "../../../data/jsons/__durations.json";

interface Props {
  onChangeSpecialty: (specialty: any, action: string) => void;
  onChangeProfession: (profession: Profession) => void;
  onChangeResource: (resource: ResourceFilter, action: string) => void;
  onChangeDuration: (duration: DurationFilter, action: string) => void;
  professions: Profession[];
  specialties: Specialty[];
  currentResource: string | null | undefined;
  currentSpecialty: string | null | undefined;
  currentDuration: string | null | undefined;
  currentProfession: string | null | undefined;
  setCurrentResource: (resource: any) => void;
  setCurrentSpecialty: (specialty: any) => void;
  setCurrentDuration: (duration: any) => void;
  setCurrentProfession: (profession: any) => void;
}

let resources = resourcesMapping;
let durations = durationsMapping;

const StoreSideBar: FC<Props> = ({
  onChangeSpecialty,
  onChangeProfession,
  onChangeResource,
  onChangeDuration,
  professions,
  specialties,
  currentResource,
  currentDuration,
  setCurrentResource,
  setCurrentProfession,
  setCurrentSpecialty,
  setCurrentDuration,
  currentSpecialty,
  currentProfession,
}) => {
  const [specialtyVisible, setSpecialtyVisible] = useState<boolean>(true);
  const [resourceVisible, setResourceVisible] = useState<boolean>(false);
  const [professionVisible, setProfessionVisible] = useState<boolean>(false);
  const [durationVisible, setDurationVisible] = useState<boolean>(false);

  const toggleSpecialtyVisibility = () => {
    setSpecialtyVisible((prevVisible) => !prevVisible);
  };
  const toggleResourceVisibility = () => {
    setResourceVisible((prevVisible) => !prevVisible);
  };
  const toggleProfessionVisibility = () => {
    setProfessionVisible((prevVisible) => !prevVisible);
  };
  const toggleDurationVisibility = () => {
    setDurationVisible((prevVisible) => !prevVisible);
  };

  const setSpecialtyFilter = (specialty: Specialty, action: string) => {
    (action == "add") ? setCurrentSpecialty(slugifySpecialty(specialty.name)) : setCurrentSpecialty(null);
    onChangeSpecialty(specialty, action);
  };

  const setResourceFilter = (resource: ResourceFilter, action: string) => {
    (action == "add") ? setCurrentResource(resource.slug) : setCurrentResource(null);
    onChangeResource(resource, action);
  };

  const setProfessionFilter = (profession: Profession, action: string) => {
    (action == "add") ? setCurrentProfession(profession.slug) : setCurrentProfession(null);
    onChangeProfession(profession);
  };

  const setDurationFilter = (duration: DurationFilter, action: string) => {
    (action == "add") ? setCurrentDuration(duration.slug) : setCurrentDuration(null);
    onChangeDuration(duration, action);
  };

  return (
    <>
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            specialtyVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleSpecialtyVisibility}>
            Especialidades
          </h3>
          {specialties && specialties.length ? (
            <ul>
              {specialties.map((specialty, index) => {
                return (
                  <li key={`spe_${index}`}>
                    <div className="course-sidebar-list">
                      <input
                        className="edu-check-box bg-transparent border-none text-transparent focus:ring-0 focus:ring-offset-0"
                        type="checkbox"
                        id={`specialty_${specialty.name}`}
                        onChange={(e) => setSpecialtyFilter(specialty, e.target.checked ? "add" : "delete")}
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
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            resourceVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleResourceVisibility}>
            Recurso
          </h3>
          {resourceVisible && (
            <ul>
              {resources.map((resource, index) => {
                return (
                  <li key={`res_${index}`}>
                    <div className="course-sidebar-list">
                      <input
                        className="edu-check-box bg-transparent border-none text-transparent focus:ring-0 focus:ring-offset-0"
                        type="checkbox"
                        id={`res_${resource.id}`}
                        checked={ currentResource == resource.slug }
                        onChange={(e) =>
                          setResourceFilter(
                            resource,
                            e.target.checked ? "add" : "delete"
                          )
                        }
                      />
                      <label
                        className="edu-check-label"
                        htmlFor={`res_${resource.id}`}
                      >
                        {resource.name}{" "}
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
            professionVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleProfessionVisibility}>
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
                        checked={ currentProfession == profession.slug }
                        onChange={(e) =>
                          setProfessionFilter(
                            profession,
                            e.target.checked ? "add" : "delete"
                          )
                        }
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
            durationVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleDurationVisibility}>
            Duración
          </h3>
          <ul>
            {durations.map((duration, index) => {
              return (
                <li key={`dur_${index}`}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={`dur_${duration.id}`}
                      checked={ currentDuration == duration.slug }
                      onChange={(e) =>
                        setDurationFilter(
                          duration,
                          e.target.checked ? "add" : "delete"
                        )
                      }
                    />
                    <label
                      className="edu-check-label"
                      htmlFor={`dur_${duration.id}`}
                    >
                      {duration.name}
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
