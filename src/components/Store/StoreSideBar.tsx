import React, { useReducer } from "react";
import fai from "../../styles/fai/fontAwesome5Pro.module.css";

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

const StoreSideBar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const categories = [
    { label: "Anestesiología y dolor", id: "an_dol" },
    { label: "Cardiología", id: "car" },
    { label: "Cirugía", id: "cir" },
    { label: "Dermatología", id: "der" },
    { label: "Diabetes", id: "dia" },
    { label: "Emergentología", id: "eme" },
    { label: "Gastroenterología", id: "gas" },
    { label: "Geriatría", id: "ger" },
    { label: "Ginecología", id: "gin" },
    { label: "Infectología", id: "inf" },
    { label: "Inglés técnico", id: "ing" },
    { label: "Kinesiología", id: "kin" },
    { label: "Medicina familiar", id: "med_fam" },
    { label: "Medicina general", id: "med_gen" },
    { label: "Medicina intensiva", id: "med_int" },
    { label: "Nutrición", id: "nut" },
    { label: "Obstetricia", id: "obs" },
    { label: "Odontología", id: "odo" },
    { label: "Oftalmología", id: "oft" },
    { label: "Oncología", id: "onc" },
    { label: "Psicología", id: "psi" },
    { label: "Psiquiatría", id: "psi" },
    { label: "Pediatría", id: "ped" },
    { label: "Hematología", id: "hem" },
    { label: "Traumatología", id: "tra" },
  ];

  const resources = [
    { label: "Curso", id: "course" },
    { label: "E-book", id: "ebook" },
  ];

  const professions = [
    { label: "Personal médico", id: "per_med" },
    { label: "Personal de enfermería", id: "per_enf" },
    { label: "Auxiliar", id: "aux" },
  ];

  const duration = [
    { label: "Hasta 100 horas", id: "less_100" },
    { label: "De 100 a 300 horas", id: "100_to_300" },
    { label: "Más de 300 horas", id: "more_300" },
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
            Categorías
          </h3>
          <ul>
            <li>
              <div className="course-sidebar-list">
                <input className="edu-check-box" type="checkbox" id="todas" />
                <label className="edu-check-label" htmlFor="todas">
                  Ver todas
                </label>
              </div>
            </li>
            {categories.map((category, index) => {
              return (
                <li key={index}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={category.id}
                    />
                    <label className="edu-check-label" htmlFor={category.id}>
                      {category.label}
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
                      id={resource.id}
                    />
                    <label className="edu-check-label" htmlFor={resource.id}>
                      {resource.label}
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
                      id={profession.id}
                    />
                    <label className="edu-check-label" htmlFor={profession.id}>
                      {profession.label}
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
                <li key={index}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={item.id}
                    />
                    <label className="edu-check-label" htmlFor={item.id}>
                      {item.label}
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
