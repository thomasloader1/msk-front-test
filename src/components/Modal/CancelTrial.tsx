import { useState, FC, useContext, useEffect } from "react";
import NcModalSmall from "@/components/NcModal/NcModalSmall";
import TrialModalContent from "@/components/NcModal/TrialModalContent";
import { AuthContext } from "@/context/user/AuthContext";
import api from "../../../Services/api";

interface CancelTrialModalProps {
  item: any;
  isOpenProp: boolean;
  onCloseModal: () => void;
}

const CancelTrialModal: FC<CancelTrialModalProps> = ({
  isOpenProp,
  item,
  onCloseModal,
}) => {
  const [onRequest, setOnRequest] = useState(isOpenProp);
  const [confirmModal, setConfirmModal] = useState(false);
  const { state: authState } = useContext(AuthContext);

  const suspendTrial = async () => {
    const res = await api.cancelTrialCourse(item, authState);

    if (res) {
      setOnRequest(false);
      setConfirmModal(true);
    }
  };

  function closeModal() {
    if (typeof isOpenProp !== "boolean") {
      setOnRequest(false);
    }
    onCloseModal && onCloseModal();
  }

  function openModal() {
    if (typeof isOpenProp !== "boolean") {
      setOnRequest(true);
    }
  }

  useEffect(() => {
    setOnRequest(!!isOpenProp);
  }, [isOpenProp]);

  return (
    <>
      <NcModalSmall
        isOpenProp={onRequest}
        onCloseModal={() => setOnRequest(false)}
        renderTrigger={() => null}
        contentExtraClass="max-w-[500px]"
        renderContent={() => (
          <TrialModalContent
            title="Tu prueba de 7 días gratis finalizará"
            desc="Si más adelante deseas continuar 
            con este curso, deberás inscribirte.
            ¿Quieres darte de baja?"
            textButton="Confirmar"
            cancelButton={true}
            setShow={setOnRequest}
            cancelTrial={suspendTrial}
            onCancelTrial={closeModal}
          />
        )}
      />

      <NcModalSmall
        isOpenProp={confirmModal}
        onCloseModal={() => setConfirmModal(false)}
        renderTrigger={() => null}
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

export default CancelTrialModal;
