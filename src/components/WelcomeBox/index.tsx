import Badge from 'components/Badge/Badge';
import { WpContentData } from 'hooks/useWpContent';
import React, { FC } from 'react'
import { parseHtml } from 'utils/parseHTML';

interface WelcomeBoxProps{
    content: WpContentData | null;
}

const WelcomeBox: FC<WelcomeBoxProps> = ({content}) => {
  return (
    <div className='bg-[#F3F4F6] p-4 py-8 md:container md:rounded-xl mb-8'>
        <Badge name={content?.sobre_mks.etiqueta} color='blue-home' />
        <h3 className='text-xl my-3 font-normal' dangerouslySetInnerHTML={{__html: parseHtml(content?.sobre_mks.texto_1 as string, true)}}/>
        <p className='text-violet-wash' dangerouslySetInnerHTML={{__html: parseHtml(content?.sobre_mks.texto_2 as string, true)}}/>
    </div>
  )
}

export default WelcomeBox