import React, { FC, useContext, useState } from "react";
// import fai from "../../styles/fai/fontAwesome5Pro.module.css";
interface Props {
  instructor: any;
  country?: string;
}

const ProductDetailsInstructor: FC<Props> = ({ instructor, country }) => {
  const [displayBiography, setDisplayBiography] = useState(false);
  const triggerDisplayBiography = () => {
    setDisplayBiography(!displayBiography);
  };
  const instructorName = { __html: instructor.name };

  return (
    <div className="course-instructors">
      <div className="instructors-heading">
        <div className="instructors-img">
          <img
            src={instructor.image.replace(`${country || "mx"}.`, "")}
            alt="img not found"
            className="animate-fade"
          />
        </div>
        <div className="instructors-body">
          <h3
            dangerouslySetInnerHTML={instructorName}
            className="animate-fade"
          ></h3>
          <p className="mt-2 animate-fade">{instructor.description}</p>
          {instructor.specialties.length || instructor.centres.length ? (
            <p
              onClick={triggerDisplayBiography}
              className="text-primary font-semibold mt-2 text-sm cursor-pointer animate-fade"
            >
              Ver biografía
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      {(displayBiography && instructor.specialties.length) ||
      instructor.centres.length ? (
        <div className="intructors-content">
          {instructor.specialties.length ? (
            <div>
              <h5 className="mb-2">Especialidad</h5>
              <ul>
                {instructor.specialties.map(
                  (specialty: string, index: number) => {
                    return (
                      <li key={`spec_${index}`}>
                        {/* <i className={`${fai.fa} ${fai["fa-circle"]}`}></i> */}
                        {specialty}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ) : (
            <></>
          )}

          {instructor.centres.length ? (
            <div>
              <h5 className="mt-4 mb-2">Hospitales / Centros</h5>
              <ul>
                {instructor.centres.map((specialty: string, index: number) => {
                  return (
                    <li key={`spec_${index}`}>
                      {/* <i className={`${fai.fa} ${fai["fa-circle"]}`}></i> */}
                      {specialty}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductDetailsInstructor;
