import { Dispatch, FC, SetStateAction } from 'react'

interface TrialModalContentProps{
    title: string;
    desc: string;
    textButton: string;
    setShow?: Dispatch<SetStateAction<boolean>>;
    goToAccount?: () => void;
}

const TrialModalContent: FC<TrialModalContentProps> = ({ setShow,goToAccount,title, desc, textButton}) => {
  const handleCloseModal = () => {
    if(textButton.includes("Volver") && typeof setShow !== 'undefined'){
      setShow(false)
    }

    if(textButton.includes("Comienza ahora") && typeof goToAccount !== 'undefined'){
      goToAccount()
    }
  }

  return (
    <div className='text-center'>
        <h4 className='text-xl mb-4'>{title}</h4>
        <p className='mb-8 font-medium text-violet-wash'>{desc}</p>
        <button onClick={() => handleCloseModal} className="video-cart-btn w-full">{textButton}</button>
    </div>
  )
}

export default TrialModalContent