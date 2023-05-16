import Accordion from "components/Accordion/Accordion";
import { Topic } from "data/types";
import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
  topics: Topic;
}

const ProductCurriculiam: FC<Props> = ({ topics }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [accordionContent, setAccordionContent] = useState<any[]>([]);
  const [auxTopics, setAuxTopics] = useState<Topic>(topics);
  const handleAccordionClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const formattedTopics: any[] = [];
    Object.keys(topics).map((key, index) => {
      if (key != "data") formattedTopics.push(topics[index]);
    });
    setAccordionContent(formattedTopics);
  }, [auxTopics]);

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
    <div className="my-4">
      <div className="flex flex-col gap-3 pt-7 pb-6">
        <h4 className="font-semibold text-xl">Qué temas verás</h4>
        <p className="modules-description">10 módulos • 250 horas estimadas</p>
      </div>
      {accordionContent.length ? (
        <div className="modules pb-6">
          {accordionContent.map((item, index) => {
            return (
              <Accordion
                title={item.card_title}
                index={index}
                currentIndex={openIndex}
                setCurrentIndex={() => handleAccordionClick(index)}
                key={`acc_${index}`}
              >
                <p className="accordion-content p-3">{parseToHTML(item.card_body)}</p>
              </Accordion>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ProductCurriculiam;
