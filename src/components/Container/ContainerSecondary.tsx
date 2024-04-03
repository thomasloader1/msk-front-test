import { FC, ReactNode } from 'react'
import { parseHtml } from 'utils/parseHTML'

interface ContainerSecondaryProps{
  contentAttribute:{texto_1: string; texto_2: string;} | null
  children?: ReactNode| null
}

const ContainerSecondary:FC<ContainerSecondaryProps> = ({contentAttribute, children= null}) => {
  return (
    <div className='bg-[#F3F4F6] mt-8 p-4 py-8 md:container md:rounded-xl mb-8 text-center'>                
        <h3 className='text-xl md:text-3xl my-3 font-normal' dangerouslySetInnerHTML={{__html: parseHtml(contentAttribute?.texto_1 as string, true)}}/>
        <p className='text-violet-wash' dangerouslySetInnerHTML={{__html: parseHtml(contentAttribute?.texto_2 as string, true)}}/>
        {children}
    </div>
  )
}

export default ContainerSecondary