import React, { FC, useContext, useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import useInterval from "hooks/useInterval";
import { hasText } from "logic/account";
import { UserCourseProgress } from "data/types";
import spinIcon from "../../images/icons/spin.svg";
import { AuthContext } from "context/user/AuthContext";

interface ButtonAccessCourseProps {
  item: UserCourseProgress;
  goToEnroll: (product_code: number, email: string) => Promise<any>;
  goToLMS: (
    product_code: number,
    product_code_cedente: string,
    email: string
  ) => void;
  email: string;
}

const ButtonAccessCourse: FC<ButtonAccessCourseProps> = ({
  item,
  goToEnroll,
  goToLMS,
  email,
}) => {
  const [status, setStatus] = useState(item.status);
  const [isDisabled, setIsDisabled] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const { isRunning, data, startWatch } = useInterval(email);
  const handleClick = async () => {
    setOnRequest(true);
    try {
      if (status === "Sin enrolar") {
        const response = await goToEnroll(item.product_code, email);

        if (response.data[0].code.includes("SUCCESS")) {
          await startWatch(item.product_code);
          setOnRequest(false);
        } else {
          setOnRequest(false);
        }
      } else {
        goToLMS(item.product_code, item.product_code_cedente as string, email);
        setOnRequest(false);
      }
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
      sizeClass="py-1 sm:px-5"
      disabled={
        isDisabled || onRequest || status.includes("Listo para enrolar")
      }
    >
      {onRequest || status.includes("Listo para enrolar") ? (
        <div className="flex justify-center items-center">
          <span className="text-sm mr-2">Procesando</span>
          <div className="w-4 h-4 my-1 border-t-2 border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <span className="text-sm">{hasText(status)}</span>
      )}
    </ButtonPrimary>
  );
};

export default ButtonAccessCourse;
