import React, { FC, useState } from "react";
import fai from "../../styles/fai/fontAwesome5Pro.module.css";
interface Props {
  instructor: any;
}

const ProductDetailsInstructor: FC<Props> = ({ instructor }) => {
  const [displayBiography, setDisplayBiography] = useState(false);

  const triggerDisplayBiography = () => {
    setDisplayBiography(!displayBiography);
  };
  const instructorName = {__html: instructor.name};

  return (
    <div className="course-instructors">
      <div className="instructors-heading">
        <div className="instructors-img">
          <img src={instructor.image.replace('mx.', '')} alt="img not found" />
        </div>
        <div className="instructors-body">
          <h5 dangerouslySetInnerHTML={instructorName}></h5>
          <p className="mt-2">{instructor.description}</p>
          {instructor.specialties.length || instructor.centres.length ?(<p
              onClick={triggerDisplayBiography}
              className="text-primary font-semibold mt-2 text-sm cursor-pointer"
          >
            Ver biografía
          </p>) : (<></>)}
        </div>
      </div>
      {displayBiography && (instructor.specialties.length || instructor.centres.length) ? (
        <div className="intructors-content">
          {instructor.specialties.length ?(<div>
            <h5 className="mb-2">Especialidad</h5>
            <ul>
              {instructor.specialties.map((specialty: string, index: number) => {
                return (
                    <li key={`spec_${index}`}>
                      <i className={`${fai.fa} ${fai["fa-circle"]}`}></i>
                      {specialty}
                    </li>
                );
              })}
            </ul>
          </div>) : (<></>)}

          {instructor.centres.length ?(<div>
            <h5 className="mt-4 mb-2">Hospitales / Centros</h5>
            <ul>
              {instructor.centres.map((specialty: string, index: number) => {
                return (
                    <li key={`spec_${index}`}>
                      <i className={`${fai.fa} ${fai["fa-circle"]}`}></i>
                      {specialty}
                    </li>
                );
              })}
            </ul>
          </div>) : (<></>)}


        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductDetailsInstructor;
