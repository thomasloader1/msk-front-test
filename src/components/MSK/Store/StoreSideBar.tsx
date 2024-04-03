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
import resourcesMapping from "../../../data/jsons/__resources.json";
import reducer, {State} from "@/context/storeFilters/storeFiltersReducer";
import {json} from "stream/consumers";

interface Props {
  onChangeSpecialty: (specialty: any) => void;
  onChangeProfession: (profession: Profession) => void;
  onChangeResource: (resource: ResourceFilter) => void;
  onChangeDuration: (duration: DurationFilter) => void;
  professions: Profession[];
  specialties: Specialty[];
}

let resources = [
  {
    id: 1,
    name: "Curso",
    slug: "curso",
  },
  {
    id: 2,
    name: "Guías profesionales",
    slug: "guias-profesionales",
  },
];

let durations = [
  {
    id: 1,
    name: "Hasta 100 horas",
    slug: "dur_1",
  },
  {
    id: 2,
    name: "De 100 a 300 horas",
    slug: "dur_2",
  },
  {
    id: 3,
    name: "Más de 300 horas",
    slug: "dur_3",
  },
];

const StoreSideBar: FC<Props> = ({
                                   onChangeSpecialty,
                                   onChangeProfession,
                                   onChangeResource,
                                   onChangeDuration,
                                   professions,
                                   specialties,
                                 }) => {
  const [specialtyVisible, setSpecialtyVisible] = useState<boolean>(true);
  const [resourceVisible, setResourceVisible] = useState<boolean>(false);
  const [professionVisible, setProfessionVisible] = useState<boolean>(false);
  const [durationVisible, setDurationVisible] = useState<boolean>(false);

  const toggleSpecialtyVisibility = () => { setSpecialtyVisible((prevVisible) => !prevVisible);};
  const toggleResourceVisibility = () => {setResourceVisible((prevVisible) => !prevVisible);};
  const toggleProfessionVisibility = () => {setProfessionVisible((prevVisible) => !prevVisible);};
  const toggleDurationVisibility = () => {setDurationVisible((prevVisible) => !prevVisible);};


  const [currentSpecialty, setCurrentSpecialty] = useState<string | null>();
  const setSpecialtyFilter = (specialty: Specialty) => {
    const specialtySlug = slugifySpecialty(specialty.name);
    console.log("SPECIALTY CLICKEADA", specialty);
    console.log("SPECIALTYSLUG", specialtySlug);
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (currentSpecialty == specialtySlug) {
      console.log("LIMPIO", currentSpecialty, specialtySlug);
      setCurrentSpecialty(null);
      onChangeSpecialty(null);
      urlSearchParams.delete("especialidad");
      const newurl = window.location.origin + window.location.pathname + '?' + urlSearchParams.toString();
      window.history.pushState({path: newurl}, '', newurl);
    } else {
      console.log("CAMBIO", currentSpecialty, specialtySlug);
      setCurrentSpecialty(specialtySlug);
      onChangeSpecialty(specialty);
      //Add especialidad to the url
      urlSearchParams.set("especialidad", specialtySlug);
      const newurl = window.location.origin + window.location.pathname + '?' + urlSearchParams.toString();
      window.history.pushState({path: newurl}, '', newurl);
    }
  };

  const setResourceFilter = (resource: ResourceFilter, action: string) => {
    const resourceSlug = slugifySpecialty(resource.name);
    console.log("RESOURCE CLICKEADO", resource);
    console.log("RESOURCESLUG", resourceSlug);
    const urlSearchParams = new URLSearchParams(window.location.search);
    onChangeResource(resource);
    //Check if it exists in the URL and is the same slug
    if (action == 'add'){
      urlSearchParams.set("recurso", resourceSlug);
    }else{
      urlSearchParams.delete("recurso");
    }
    const newurl = window.location.origin + window.location.pathname + '?' + urlSearchParams.toString();
    window.history.pushState({path: newurl}, '', newurl);
  };

  const setProfessionFilter = (profession: Profession, action: string) => {
    const professionSlug = slugifySpecialty(profession.name);
    console.log("PROFESSION CLICKEADO", profession);
    console.log("PROFESSION SLUG", professionSlug);
    const urlSearchParams = new URLSearchParams(window.location.search);
    onChangeProfession(profession);
    //Check if it exists in the URL and is the same slug
    if (action == 'add'){
      urlSearchParams.set("profesion", professionSlug);
    }else{
      urlSearchParams.delete("profesion");
    }
    const newurl = window.location.origin + window.location.pathname + '?' + urlSearchParams.toString();
    window.history.pushState({path: newurl}, '', newurl);
  };

  const setDurationFilter = (duration: DurationFilter, action: string) => {
    const professionSlug = slugifySpecialty(duration.name);
    console.log("DURATION CLICKEADO", duration);
    console.log("DURATION SLUG", professionSlug);
    const urlSearchParams = new URLSearchParams(window.location.search);
    onChangeDuration(duration);
    //Check if it exists in the URL and is the same slug
    if (action == 'add'){
      urlSearchParams.set("duracion", professionSlug);
    }else{
      urlSearchParams.delete("duracion");
    }
    const newurl = window.location.origin + window.location.pathname + '?' + urlSearchParams.toString();
    window.history.pushState({path: newurl}, '', newurl);
  };


  const updateResults = () => {
    console.log('UPDATING RESULTS FROM REFRESH', currentSpecialty);
    const params = new URLSearchParams(window.location.search);
    const specialtySlug = params.get("especialidad");
    const resourceSlug = params.get("recurso");
    if (specialtySlug && specialtySlug !== currentSpecialty) {
      const specialtyName = specialtiesMapping[specialtySlug as keyof typeof specialtiesMapping];
      setSpecialtyFilter({name: specialtyName});
    }
    if (resourceSlug) {
      //find resource from variable resources where resources.slug is resourceSlug
      let resource = resources.find((resource) => resource.slug == resourceSlug);
      if (resource){
        setResourceFilter(resource, 'add');
      }
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
        <div className={`course-sidebar-info ${specialtyVisible ? "content-visible" : "content-hidden"}`}>
          <h3 className="drop-btn" onClick={toggleSpecialtyVisibility}>Especialidades</h3>
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
      <div className="course-sidebar-widget mb-2">
        <div className={`course-sidebar-info ${resourceVisible ? "content-visible" : "content-hidden"}`}>
          <h3 className="drop-btn" onClick={toggleResourceVisibility}>Recurso</h3>
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
                        //If it's checked pass 'add' if not pass 'delete'
                        onChange={(e) => setResourceFilter(resource, e.target.checked ? 'add' : 'delete')}
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
            </ul>)}
        </div>
      </div>

      <div className="course-sidebar-widget mb-2">
        <div className={`course-sidebar-info ${professionVisible ? "content-visible" : "content-hidden"}`}>
          <h3 className="drop-btn" onClick={toggleProfessionVisibility}>Profesión</h3>
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
                        onChange={(e) => setProfessionFilter(profession, e.target.checked ? 'add' : 'delete')}
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
        <div className={`course-sidebar-info ${durationVisible ? "content-visible" : "content-hidden"}`}>
          <h3 className="drop-btn" onClick={toggleDurationVisibility}>Duración</h3>
          <ul>
            {durations.map((item, index) => {
              return (
                <li key={`dur_${index}`}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={`dur_${item.id}`}
                      onChange={(e) => setDurationFilter(item, e.target.checked ? 'add' : 'delete')}
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
      {/*

       */}
    </>
  );
};

export default StoreSideBar;
