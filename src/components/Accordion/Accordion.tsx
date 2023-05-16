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
    <div className="overflow-hidden accordion">
      <div
        className={`bg-natural-100 p-4 cursor-pointer flex items-center justify-between ${
          isAnimating ? "opacity-0" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <svg
            className={`fill-current h-4 w-4 mr-3 transform transition-transform duration-500 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Accordion;
