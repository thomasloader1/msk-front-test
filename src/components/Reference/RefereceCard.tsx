import { FC } from 'react'
import starIcon from "/public/images/icons/star.svg";
import googleIcon from "/public/images/icons/googleIcon.svg";
import Image from "next/image";
import {removeFirstSubdomain} from "@/utils/removeFirstSubdomain";

const ReferenceCard: FC<{reference: any;}> = ({reference}) => {

    const stars = Array.from({ length: Number(reference.numero) }, (_, index) => (
        <Image key={index} {...starIcon} width={25} height={25} alt="Star" />
    ));

    const personReferenceImage = removeFirstSubdomain(reference.imagen)

    return (
        <div className=" px-10 p-6 bg-white transition-all hover:shadow-xl rounded-xl">
            <div className="flex items-center mb-4">
                <Image src={personReferenceImage} width={44} height={44} alt={reference.titulo} className="mr-3" />
                <div >
                    <h4 className="text-lg text-[#392C35] text-left">{reference.titulo}</h4>
                    <div className="flex">
                        {stars}
                    </div>
                </div>
                <Image {...googleIcon} width={35} height={35} className="ml-auto mr-3" />
            </div>
            <p className="text-violet-wash text-left text-sm">{reference.parrafo}</p>
        </div>
    )
}

export default ReferenceCard