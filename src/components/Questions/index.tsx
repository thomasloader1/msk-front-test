import Accordion from 'components/Accordion/Accordion';
import { FC, useState } from 'react'
import { stripHtmlTags } from 'utils/stripHtmlTags';

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
        <h4 className='text-[36px] mb-8'>{stripHtmlTags(content.texto)}</h4>

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
                    <p className='text-violet-wash text-left'>{item.parrafo}</p>
                </div>
              </Accordion>
            );
          })}
    </section>
  )
}

export default Questions