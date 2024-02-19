import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

interface TrialModalContentProps{
    title: string;
    desc: string;
    textButton: string;
    setShow?: Dispatch<SetStateAction<boolean>>;
    goToAccount?: boolean | undefined;
    goToCourse?: string | undefined;
}

const TrialModalContent: FC<TrialModalContentProps> = ({ setShow,goToAccount, goToCourse,title, desc, textButton}) => {
  const history = useHistory()
  const handleCloseModal = () => {

    if(title.includes("Prueba ya solicitada") && goToCourse){
      history.push(`/curso/${goToCourse}`)
      return
    }

    if(textButton.includes("Volver") && typeof setShow !== 'undefined'){
      setShow(false)
    }

    if(title.includes("Listo") && goToAccount){
      history.push("/mi-cuenta")
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
    </div>
  )
}

export default TrialModalContent