import Accordion from "components/Accordion/Accordion";
import { Evaluation, Topic } from "data/types";
import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
  evaluations: Evaluation;
}

const ProductEvaluation: FC<Props> = ({ evaluations }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [evaluationList, setEvaluationList] = useState<any[]>();
  const handleAccordionClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const formattedEvs: any[] = [];
    Object.keys(evaluations).map((key, index) => {
      if (key != "data") formattedEvs.push(evaluations[index]);
    });
    setEvaluationList(formattedEvs);
  }, [evaluations]);

  const parseToHTML = (htmlString: string): JSX.Element => {
    const textNodes = htmlString.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
    return <>{textNodes}</>;
  };

  useEffect(() => {});

  return (
    <div className="course-learn-wrapper">
      <div className="course-learn">
        <div className="course-leranm-tittle">
          <h4 className="mb-15 font-bold text-xl poppins-bold">
            Cómo evaluamos
          </h4>
        </div>

        <div className="grid grid-col-2 grid-flow-col">
          <div className="course-leran-text f-left">
            <ul>
              {evaluationList?.map((evaluation, index) => {
                return (
                  <li key={`ev_${index}`}>
                    <img
                      src="/src/images/vectors/isotipo.svg"
                      width="20"
                      alt=""
                    />{" "}
                    {evaluation.methodology}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEvaluation;
