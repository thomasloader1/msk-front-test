import React from "react";
import Image from "next/image";

export default function Showing({title, icon}: {title: string; icon: string}){
    return (
        <div className="flex items-center mt-2">
            <Image src={icon} className="block mr-2" width={15}  height={15} alt="Cantidad Modulos" />
            <span className="text-neutral-300 text-[14px] line-clamp-1">{title}</span>
        </div>
    )
}