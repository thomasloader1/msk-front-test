import React, { FC, ReactNode, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
  index: number;
  currentIndex: number | null;
  setCurrentIndex: (index: number) => void;
}

const Accordion: FC<Props> = ({
  title,
  children,
  index,
  currentIndex,
  setCurrentIndex,
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

  return (
    <div className="overflow-hidden accordion text-violet-dark">
      <div
        className={`bg-natural-100 py-3 px-1 cursor-pointer flex items-center justify-between ${
          isAnimating ? "opacity-0" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <div className="w-[20px]">
            <svg
              className={`fill-current h-4 w-4 mr-3 transform transition-transform duration-500 ${
                isOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <h2 className="font-normal inter text-[16px] py-0.5"><span className="font-medium">Módulo {index +1}</span> • {title.replace(/^\s*Módulo\s*\d+\.\s*/, '')}</h2>
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Accordion;
