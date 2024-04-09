import { FC } from "react";
import errorIcon from "/public/images/icons/error-icon.svg";
import Image from "next/image";

interface ShowErrorMessageProps {
  text: string;
}
console.log(errorIcon)
const ShowErrorMessage: FC<ShowErrorMessageProps> = ({ text }) => {
  return (
    <div className="flex justify-center flex-col mt-4 w-full">
      <Image src={errorIcon} className="h-8" alt="error" />
      <p
        className="text-red-500 text-center w-full"
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>
    </div>
  );
};

export default ShowErrorMessage;
