import React, { FC, ReactNode, useState } from "react";
import minusIcon from "/public/images/icons/minusIcon.svg"
import plusIcon from "/public/images/icons/plusIcon.svg"
import Image from "next/image";

interface Props {
  title: string;
  children: ReactNode;
  index: number;
  currentIndex: number | null;
  setCurrentIndex: (index: number) => void;
  forModules?: boolean;
  bordered?: boolean;
}

const Accordion: FC<Props> = ({
  title,
  children,
  index,
  currentIndex,
  setCurrentIndex,
  forModules = true,
  bordered = false
}: Props) => {
  const isOpen = index === currentIndex;
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleAccordion = () => {
    if (isOpen) {
      setIsAnimating(true);
      setCurrentIndex(-1);
      setIsAnimating(false);
    } else {
      setCurrentIndex(index);
    }
  };

  const iconAccordion = isOpen ? minusIcon : plusIcon

  return (
    <div className={`overflow-hidden accordion ${bordered && "border"}`}>
      <div
        className={`bg-natural-100 py-3 px-1 cursor-pointer flex items-center justify-between ${
          isAnimating ? "opacity-0" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <div className="w-[20px]">
            <Image {...iconAccordion} className="ml-1"/>
          </div>
          {forModules ? (<span className="font-medium mr-1">Módulo {index + 1} •</span>) : null}
          {title.replace(/^\s*Módulo\s*\d+\.\s*/, '')}
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Accordion;
