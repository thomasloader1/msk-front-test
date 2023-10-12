import Accordion from "components/Accordion/Accordion";
import ButtonPrimary from "components/Button/ButtonPrimary";
import TemarioForm from "components/Forms/Temario";
import NcModal from "components/NcModal/NcModal";
import { Topic } from "data/types";
import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
  topics: Topic;
  hours: any;
}

const ProductCurriculiam: FC<Props> = ({ topics, hours }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [accordionContent, setAccordionContent] = useState<any[]>([]);
  const [auxTopics, setAuxTopics] = useState<Topic>(topics);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const handleAccordionClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const formattedTopics: any[] = [];
    Object.keys(topics).map((key, index) => {
      if (key !== "data") formattedTopics.push(topics[index]);
    });
    setAccordionContent(formattedTopics);
  }, [auxTopics]);

  const parseToHTML = (htmlString: string): JSX.Element => {
    //console.log({ htmlString })
    if (htmlString) {
      const textNodes = htmlString.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ));
      return <>{textNodes}</>;
    }

    return <>{htmlString}</>;
  };

  // console.log({ topics, accordionContent });

  const downloadTopics = () => {
    window.open(topics?.data?.temario_link, "_blank");
  };
  const updateFormSent = (value: boolean) => {
    setIsFormSent(value);
    setTimeout(() => {
      setShowDownloadModal(false);
      setIsFormSent(false);
    }, 2500);
  };

  return (
    <div className="my-4">
      <div className="flex flex-col gap-3 pt-7 pb-6">
        <h4 className="font-semibold text-xl">Qué temas verás</h4>
        <div className="flex items-center justify-between">
          <p className="modules-description">
            {accordionContent.length} módulos • {hours?.value} horas estimadas
          </p>
          <ButtonPrimary
            onClick={() => setShowDownloadModal(true)}
            sizeClass="px-4 py-2 sm:px-5"
            className="font-semibold"
            targetBlank
          >
            Descargar Temario
          </ButtonPrimary>
        </div>
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
                <p className="accordion-content p-3">
                  {parseToHTML(item.card_body)}
                </p>
              </Accordion>
            );
          })}
        </div>
      ) : null}
      <NcModal
        isOpenProp={showDownloadModal}
        onCloseModal={() => {
          setShowDownloadModal(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass={"max-w-screen-md"}
        renderContent={() => (
          <TemarioForm
            onCloseModal={() => setShowDownloadModal(false)}
            updateFormSent={updateFormSent}
          />
        )}
        modalTitle={isFormSent ? " " : "Descarga el temario completo"}
      />
    </div>
  );
};

export default ProductCurriculiam;
