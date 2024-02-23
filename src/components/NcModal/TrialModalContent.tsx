import api from 'Services/api';
import { AuthContext } from 'context/user/AuthContext';
import { Dispatch, FC, SetStateAction, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

interface TrialModalContentProps{
    title: string;
    desc: string;
    textButton: string;
    setShow?: Dispatch<SetStateAction<boolean>>;
    product?: any | undefined;
    goToAccount?: boolean | undefined;
    goToCourse?: string | undefined;
    cancelButton?: boolean | undefined;
}

const TrialModalContent: FC<TrialModalContentProps> = ({ setShow,product,cancelButton,goToAccount, goToCourse,title, desc, textButton}) => {
  const history = useHistory()
  const {state: authState} = useContext(AuthContext)
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

    if(textButton.includes("Confirmar")){
      console.log("Confirmar action")
      api.cancelTrialCourse(product, authState);
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