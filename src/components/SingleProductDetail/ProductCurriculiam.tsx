import Accordion from "components/Accordion/Accordion";
import React, { FC, useState } from "react";

const ProductCurriculiam: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const accordionContent = [
    {
      title: "Módulo 1 • Insuficiencia cardíaca y miocardiopatías",
      content: [
        "ICAD y síndrome cardiorrenal",
        "Terapias avanzadas en trasplante. Dispositivos y manejo quirúrgico",
        "Mecanismos básicos y fisiopatología",
        "Cardiooncologia",
      ],
    },
    {
      title: "Módulo 2 • Arritmias",
      content: [
        "ICAD y síndrome cardiorrenal",
        "Terapias avanzadas en trasplante. Dispositivos y manejo quirúrgico",
        "Mecanismos básicos y fisiopatología",
        "Cardiooncologia",
      ],
    },
    {
      title:
        "Módulo 3 • Trastornos sistémicos que afectan al aparato circulatorio",
      content: [
        "ICAD y síndrome cardiorrenal",
        "Terapias avanzadas en trasplante. Dispositivos y manejo quirúrgico",
        "Mecanismos básicos y fisiopatología",
        "Cardiooncologia",
      ],
    },
  ];

  return (
    <div className="my-4">
      <div className="flex flex-col gap-3 pt-7 pb-6">
        <h4 className="font-bold">Que temas verás</h4>
        <p>10 módulos • 250 horas estimadas</p>
      </div>
      <div className="modules">
        {accordionContent.map((item, index) => {
          return (
            <Accordion
              title={item.title}
              index={index}
              currentIndex={openIndex}
              setCurrentIndex={() => handleAccordionClick(index)}
              key={`acc_${index}`}
            >
              <ul>
                {item.content.map((item, index) => {
                  return (
                    <li className="flex gap-2" key={`acc_item_${index}`}>
                      <div className="item-mark" />
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCurriculiam;
