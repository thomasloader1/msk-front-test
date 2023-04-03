import Accordion from 'components/Accordion/Accordion';
import React, { FC, useState } from 'react';


const ProductCurriculiam: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleAccordionClick = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    return (
        <div className='my-4'>
            <Accordion title="Accordion 1" index={1} currentIndex={openIndex}
                setCurrentIndex={() => handleAccordionClick(1)}>
                <div className="course-curriculum-content flex justify-between items-center p-3">
                    <div className="course-curriculum-info">
                        <i className="flaticon-youtube"></i>
                        <h4>Importing the libraries</h4>
                    </div>
                    <div className="course-curriculum-meta">
                        <span>6:30</span>
                        <span className="time"> <i className="flaticon-lock"></i></span>
                    </div>
                </div>
                <div
                    className="course-curriculum-content flex justify-between items-center p-3">
                    <div className="course-curriculum-info">
                        <i className="flaticon-youtube"></i>
                        <h4>Importing the libraries</h4>
                    </div>
                    <div className="course-curriculum-meta">
                        <span>8:30</span>
                        <span className="time"> <i className="flaticon-lock"></i></span>
                    </div>
                </div>
            </Accordion>
            <Accordion title="Accordion 2" index={2} currentIndex={openIndex}
                setCurrentIndex={() => handleAccordionClick(2)}>
                <div className="course-curriculum-content flex justify-between items-center p-3">
                    <div className="course-curriculum-info">
                        <i className="flaticon-youtube"></i>
                        <h4>Importing the libraries</h4>
                    </div>
                    <div className="course-curriculum-meta">
                        <span>6:30</span>
                        <span className="time"> <i className="flaticon-lock"></i></span>
                    </div>
                </div>
                <div
                    className="course-curriculum-content flex justify-between items-center p-3">
                    <div className="course-curriculum-info">
                        <i className="flaticon-youtube"></i>
                        <h4>Importing the libraries</h4>
                    </div>
                    <div className="course-curriculum-meta">
                        <span>8:30</span>
                        <span className="time"> <i className="flaticon-lock"></i></span>
                    </div>
                </div>
            </Accordion>
        </div>
    )
};

export default ProductCurriculiam;