"use client"
import {FC, useState} from "react";
import Accordion from "@/components/Accordion/Accordion";
import {stripHtmlTags} from "@/lib/pageHeadUtils";
import {parseHtml} from "@/utils/parseHTML";

interface QuestionProps{
    content: {
        texto: string;
        items: {
            titulo: string;
            parrafo: string;
        }[];
    }
}

const Questions: FC<QuestionProps> = ({ content }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const handleAccordionClick = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section className='text-center mb-[96px]'>
            <h2 className='text-[36px] mb-8'>{stripHtmlTags(content.texto)}</h2>

            {content.items.map((item, index) => {
                return (
                    <Accordion
                        title={item.titulo}
                        index={index}
                        currentIndex={openIndex}
                        setCurrentIndex={() => handleAccordionClick(index)}
                        key={`acc_${index}`}
                        forModules={false}
                        bordered={true}
                    >
                        <div
                            className="accordion-content p-3 border-t transition-all"
                        >
                            <div className='text-violet-wash text-left' dangerouslySetInnerHTML={{ __html: parseHtml(item.parrafo) as string}} />
                        </div>
                    </Accordion>
                );
            })}
        </section>
    )
}

export default Questions