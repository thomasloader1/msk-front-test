import React from "react";
import { XIcon } from "@heroicons/react/solid";
import twFocusClass from "utils/twFocusClass";

export interface ButtonCloseProps {
  className?: string;
  onClick?: () => void;
  iconSize?: string;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={
        ` flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300  ${className} ` +
        twFocusClass()
      }
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <img src="/images/icons/close-menu.svg" width="23" height="23" />
    </button>
  );
};

export default ButtonClose;
