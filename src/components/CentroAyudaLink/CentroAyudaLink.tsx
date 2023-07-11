import React, { FC } from 'react'
import infoIcon from '../../images/icons/info.svg'

interface CentroAyudaLinkProps {
    addClassNames?: string;
}

const CentroAyudaLink: FC<CentroAyudaLinkProps> = ({ addClassNames }) => {
    return (
        <span className={`${addClassNames} dark:text-primary-500 forgot-password col-span-2 text-xs flex items-center`}>
            <img src={infoIcon} alt="Mensaje Informativo" />
            <span className='text-violet-wash'>Visita el Centro de ayuda.</span>
            <a
                className="nc-NcLink underline text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 ml-2"
                href="https://ayuda.msklatam.com/portal/es/kb/articles/categoria-demo"
                target='_blank'
            >
                Ingresa aquí
            </a>
        </span>
    )
}

export default CentroAyudaLink