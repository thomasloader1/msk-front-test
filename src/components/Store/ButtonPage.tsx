import NcLink from 'components/NcLink/NcLink';
import { FC, ReactNode } from 'react'

interface ButtonPageProps{
    tracking: boolean;
    page: number;
    urlTrack: string;
    icon?: ReactNode
}

const ButtonPage: FC<ButtonPageProps> = ({tracking, page, urlTrack, icon}) => {
    const redirect = tracking ? `${urlTrack}${page > 1 ? `&page=${page}` : ""}` : ""
    const content = icon ?? (page < 10 ? `0${page}` : page)
  return (
    <NcLink
        to={redirect}
        colorClass=""
      >
        {content}
      </NcLink> 
  )
}

export default ButtonPage