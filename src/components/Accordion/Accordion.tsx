import { FC, ReactNode, useState } from "react";
import minusIcon from '/images/icons/minusAccordion.svg'
import plusIcon from '/images/icons/plusAccordion.svg'

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

  return (
    <div className={`overflow-hidden accordion  text-violet-dark ${bordered && "border"}`}>
      <div
        className={`bg-natural-100 py-3 px-1 cursor-pointer flex items-center justify-between ${isAnimating ? "opacity-0" : ""}`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <div className="w-[20px]">
            <img src={isOpen ? minusIcon : plusIcon} className="ml-2" />
          </div>
          <h2 className="font-normal inter text-[16px] py-0.5 ml-2">
            {forModules ? (<span className="font-medium mr-1">Módulo {index +1} •</span> ) : null} 
            {title.replace(/^\s*Módulo\s*\d+\.\s*/, '')}
          </h2>
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Accordion;
