import { Dispatch, FC, SetStateAction } from 'react'
import { useHistory } from 'react-router-dom';

interface TrialModalContentProps{
    title: string;
    desc: string;
    textButton: string;
    setShow?: Dispatch<SetStateAction<boolean>>;
    goToAccount?: boolean | undefined;
}

const TrialModalContent: FC<TrialModalContentProps> = ({ setShow,goToAccount,title, desc, textButton}) => {
  const history = useHistory()
  const handleCloseModal = () => {
    if(textButton.includes("Volver") && typeof setShow !== 'undefined'){
      setShow(false)
    }

    if(title.includes("Listo") && goToAccount){
      history.push("/mi-cuenta")
    }
  }

  return (
    <div className='text-center'>
        <h4 className='text-xl mb-4'>{title}</h4>
        <p className='mb-8 font-medium text-violet-wash'>{desc}</p>
        <button onClick={() => handleCloseModal() } className="video-cart-btn w-full">{textButton}</button>
    </div>
  )
}

export default TrialModalContent