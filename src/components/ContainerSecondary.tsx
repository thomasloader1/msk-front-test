"use client"
import { FC, ReactNode } from 'react'
import { parseHtml } from '@/utils/parseHTML'
import {stripHtmlTags} from "@/lib/pageHeadUtils";

interface ContainerSecondaryProps{
    contentAttribute:{texto_1: string; texto_2: string;}
    children?: ReactNode| null
}

const ContainerSecondary:FC<ContainerSecondaryProps> = ({contentAttribute, children= null}) => {
    // @ts-ignore
    return (
        <div className='bg-[#F3F4F6] mt-20 px-12 py-16 pb-0 md:pb-16 md:container text-center md:rounded-[40px] mb-[76px]'>
            <h2 className='text-[20px] md:text-[36px] my-3 raleway font-normal'>{stripHtmlTags(contentAttribute.texto_1)}</h2>
            <p className='text-[14px] md:text-[20px] text-violet-wash'>{stripHtmlTags(contentAttribute.texto_2)}</p>
            {children}
        </div>
    )
}

export default ContainerSecondary