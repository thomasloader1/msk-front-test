import { Dispatch, FC, SetStateAction, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

interface TrialModalContentProps{
    title: string;
    desc: string;
    textButton: string;
    setShow?: Dispatch<SetStateAction<boolean>>;
    productSlug?: string | undefined;
    goToAccount?: boolean | undefined;
    goToCourse?: string | undefined;
    cancelButton?: boolean | undefined;
    cancelTrial?: () => void;
}

const TrialModalContent: FC<TrialModalContentProps> = ({ cancelTrial,setShow,productSlug,cancelButton,goToAccount, goToCourse,title, desc, textButton}) => {
  const history = useHistory()
  const handleCloseModal = (forElement: string | null = null) => {
    if(title.includes("Prueba ya solicitada") && goToCourse){
      history.push(`/curso/${goToCourse}`)
      return
    }
    if((textButton.includes("Volver") || (forElement != null && forElement.includes("Cancelar"))) && typeof setShow !== 'undefined'){
      setShow(false)
    }

    if(title.includes("Listo") && goToAccount){
      history.push("/mi-cuenta")
    }

    if(textButton.includes("Confirmar") && typeof cancelTrial !== 'undefined'){
      console.log("Confirmar action")
      cancelTrial()
    }

    if(textButton.includes("Ir al curso") && typeof productSlug !== 'undefined'){
      history.push(`/curso/${productSlug}`)
    }
   
  }

  const handleClickOutsideModal = (event: MouseEvent) => {
    const modal = document.getElementById("trial_modal");
    if (modal && !modal.contains(event.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <div id='trial_modal' className='text-center'>
        <h4 className='text-xl mb-4'>{title}</h4>
        <p className='mb-8 font-medium text-violet-wash'>{desc}</p>
        <button onClick={() => handleCloseModal() } className="video-cart-btn w-full">{textButton}</button>
        { cancelButton && 
        <button 
        onClick={() => handleCloseModal("Cancelar") } 
        className="video-cart-btn border-2 w-full mt-2">Cancelar</button>
      }
    </div>
  )
}

export default TrialModalContent