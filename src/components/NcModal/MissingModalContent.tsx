import { CountryContext } from 'context/country/CountryContext';
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

interface MissingModalContentProps{
    title: string;
    desc: string;
    textButton: string;
    goToPersonalData: boolean;
    productSlug?: string | undefined;
}

const MissingModalContent: FC<MissingModalContentProps> = ({ 
  goToPersonalData,
  productSlug, 
  title, 
  desc, 
  textButton
}) => {
  const [interact, setInteract] = useState(false)
  const history = useHistory()
  const {state} = useContext(CountryContext)
 
  const handleCloseModal = (forElement: string | null = null) => {
    setInteract(true)
   
    if(goToPersonalData){
      localStorage.setItem("continueTrialAccess", `/suscribe/${productSlug}`)
      history.push(`/mi-cuenta/perfil`)
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
      setInteract(false)
    };
  }, []);

  return (
    <div id='trial_modal' className='text-center'>
        <h4 className='text-xl mb-4'>{title}</h4>
        <p className='mb-8 font-medium text-violet-wash'>{desc}</p>
        <button onClick={() => handleCloseModal() } disabled={interact} className="video-cart-btn w-full disabled:bg-grey-disabled">{interact ? "Solicitando ..." : textButton }</button>
    </div>
  )
}

export default MissingModalContent