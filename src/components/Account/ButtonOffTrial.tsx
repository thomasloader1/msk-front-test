import  { FC, useContext, useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import useInterval from "hooks/useInterval";
import { hasText, statusOrdenVenta } from "logic/account";
import { UserCourseProgress } from "data/types";
import NcModalSmall from "components/NcModal/NcModalSmall";
import TrialModalContent from "components/NcModal/TrialModalContent";
import api from "Services/api";
import { AuthContext } from "context/user/AuthContext";

interface ButtonOffTrialProps {
  item: UserCourseProgress;
  email: string;
}

const ButtonOffTrial: FC<ButtonOffTrialProps> = ({
  item,
  email,
}) => {
  const statusOV = statusOrdenVenta(item?.ov);
  const [isDisabled, setIsDisabled] = useState(statusOV.isDisabled);
  const [onRequest, setOnRequest] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const {state:authState} = useContext(AuthContext);

  const handleClick = async () => {
    setOnRequest(true);
    try {
      
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isRunning != onRequest) {
      setOnRequest(isRunning);
    }
  }, [isRunning]);

  const suspendTrial = async () =>{
    const res = await api.cancelTrialCourse(item, authState);
    if(res){
      setConfirmModal(true)
    }
  }

  return (
    <>
    <ButtonPrimary
      onClick={handleClick}
      className=" border-2 border-solid hover:border-red-500 border-violet-custom text-violet-custom disabled:border-grey-disabled disabled:bg-transparent disabled:text-grey-disabled"
      sizeClass="py-0.5 sm:py-1 px-2 sm:px-5 mt-2"
      bordered={true}
      disabled={
        isDisabled || onRequest 
      }
    >
      {onRequest ? (
        <div className="flex justify-center items-center">
          <div className="w-4 h-4 my-1 border-t-2 border-violet-custom hover:border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <span className="text-[14px] sm:text-sm">Dar de baja</span>
      )}
    </ButtonPrimary>
    <NcModalSmall 
    isOpenProp={onRequest}
    onCloseModal={() => {
      setOnRequest(false);
    }}
    renderTrigger={() => {
      return null;
    }}
    contentExtraClass="max-w-[500px]"
    renderContent={() => (
      <TrialModalContent
        title="Tu prueba de 7 días gratis finalizará" 
        desc="Para continuar con este curso, deberás inscribirte."
        textButton="Confirmar" 
        cancelButton={true}
        setShow={setOnRequest}
        cancelTrial={suspendTrial}
        />
        )}
    />
    <NcModalSmall 
    isOpenProp={confirmModal}
    onCloseModal={() => {
      setConfirmModal(false);
    }}
    renderTrigger={() => {
      return null;
    }}
    contentExtraClass="max-w-[500px]"
    renderContent={() => (
      <TrialModalContent
        title="Has finalizado tu prueba de 7 días gratis" 
        desc="Para continuar con este curso, debes inscribirte."
        textButton="Ir al curso" 
        productSlug={item.slug}
        setShow={setConfirmModal}
        />
        )}
    />
    </>
  );
};

export default ButtonOffTrial;
