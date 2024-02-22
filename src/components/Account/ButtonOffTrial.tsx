import  { FC, useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import useInterval from "hooks/useInterval";
import { hasText, statusOrdenVenta } from "logic/account";
import { UserCourseProgress } from "data/types";

interface ButtonOffTrialProps {
  item: UserCourseProgress;
  email: string;
}

const ButtonOffTrial: FC<ButtonOffTrialProps> = ({
  item,
  email,
}) => {
  const statusOV = statusOrdenVenta(item?.ov);

  const [status, setStatus] = useState(item?.status);
  const [isDisabled, setIsDisabled] = useState(statusOV.isDisabled);
  const [onRequest, setOnRequest] = useState(false);
  const isReadyToEnroll = item?.status?.includes("Listo para enrolar");

  const { isRunning, data, startWatch } = useInterval(email);

  const handleClick = async () => {
    setOnRequest(true);
    try {
      
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isRunning !== onRequest) {
      setOnRequest(isRunning);
    }
  }, [isRunning]);
 

  return (
    <ButtonPrimary
      onClick={handleClick}
      className=" border-2 border-solid hover:border-red-500 border-violet-custom text-violet-custom disabled:border-grey-disabled disabled:bg-transparent disabled:text-grey-disabled"
      sizeClass="py-0.5 sm:py-1 px-2 sm:px-5 mt-2"
      bordered={true}
      disabled={
        isDisabled || onRequest || isReadyToEnroll
      }
    >
      {onRequest || isReadyToEnroll ? (
        <div className="flex justify-center items-center">
          <span className="text-[10px] sm:text-sm mr-2">Activando</span>
          <div className="w-4 h-4 my-1 border-t-2 border-violet-custom hover:border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <span className="text-[14px] sm:text-sm">Dar de baja</span>
      )}
    </ButtonPrimary>
  );
};

export default ButtonOffTrial;
