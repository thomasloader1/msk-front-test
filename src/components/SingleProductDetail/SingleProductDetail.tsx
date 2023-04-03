import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import ProductCurriculiam from './ProductCurriculiam';
import ProductDetailsInstructor from './ProductDetailsInstructor';
import ProductDetailSidebar from './ProductDetailSidebar';
import ProductProgressbar from './ProductProgressbar';
import fai from '../../styles/fai/fontAwesome5Pro.module.css'
import instructorImg from "../../images/eduman/course-instructors.png"
import BrandSlider from 'components/BrandSlider/BrandSlider';
import ContactFormSection from 'components/ContactForm/ContactForm';

const SingleProductDetail = () => {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    };

    return (
        <section className="course-detalis-area my-5 pb-90">
            <div className="container grid grid-cols-[70%_30%]">
                    <div className="">
                        <div className="course-detalis-wrapper mb-30">
                            <div className="course-heading mb-20">
                                <h2>MySQL Database : Beginner SQL Database Design</h2>
                                <div className="course-star">
                                    <ul>
                                        <li><i className={`${fai.fas} ${fai["fa-star"]}`}></i></li>
                                    </ul>
                                    <ul>
                                        <li><i className={`${fai.fas} ${fai["fa-star"]}`}></i></li>
                                    </ul>
                                    <ul>
                                        <li><i className={`${fai.fas} ${fai["fa-star"]}`}></i></li>
                                    </ul>
                                    <ul>
                                        <li><i className={`${fai.fas} ${fai["fa-star"]}`}></i></li>
                                    </ul>
                                    <ul>
                                        <li><i className={`${fai.fal} ${fai["fa-star"]}`}></i></li>
                                    </ul>
                                    <span>(254 reviews)</span>
                                </div>
                            </div>
                            <div className="course-detelis-meta">
                                <div className="course-meta-wrapper border-line-meta">
                                    <div className="course-meta-img">
                                        {/* <Link to="/instructor-profile"> */}
                                            <img src={instructorImg} alt="course-meta" />
                                        {/* </Link> */}
                                    </div>
                                    <div className="course-meta-text">
                                        <span>Created by</span>
                                        <h6>David Allberto</h6>
                                    </div>
                                </div>
                                <div className="course-Enroll border-line-meta">
                                    <p>Total Enrolled</p>
                                    <span>5,420</span>
                                </div>
                                <div className="course-update border-line-meta">
                                    <p>Last Update</p>
                                    <span>01 January 2022 </span>
                                </div>
                                <div className="course-category">
                                    <p>01 January 2022 </p>
                                    <span><Link to="/course">Data Science</Link></span>
                                </div>
                            </div>
                            <div className="course-description pt-45 pb-30">
                                <div className="course-Description">
                                    <h4>Description</h4>
                                </div>
                                <p>This course has been designed by two professional Data Scientists so that we can
                                    share our knowledge and help you learn complex theory, algorithms, and coding
                                    libraries in a simple way. We will walk you step-by-step into the World of Machine
                                    Learning. With every tutorial, you will develop new skills and improve your
                                    understanding of this challenging yet lucrative sub-field of Data Science.</p>
                            </div>
                            <BrandSlider />
                            {/* <div className="course-learn-wrapper">
                                <div className="course-learn">
                                    <div className="course-leranm-tittle">
                                        <h4 className="mb-15">What you'll learn</h4>
                                    </div>
                                    
                                    <div className="grid grid-col-2 grid-flow-col">
                                        
                                            <div className="course-leran-text f-left">
                                                <ul>
                                                    <li>Handle advanced techniques like Dimensionality Reduction</li>
                                                    <li>Handle specific topics like Reinforcement Learning best</li>
                                                    <li>Know which Machine Learning model to choose for each type of
                                                        problem</li>
                                                </ul>
                                            </div>
                                        
                                        
                                            <div className="course-leran-text">
                                                <ul>
                                                    <li>Reinforcement learning upper
                                                        confidence bound Thompson sampling</li>
                                                    <li>Model Selection and Boosting fold cross
                                                        validation parameter</li>
                                                    <li>Use Machine Learning for personal
                                                        purpose of machine</li>
                                                </ul>
                                            </div>
                                        
                                    </div>

                                </div>
                            </div> */}
                            <div className="course-requirements pt-45">
                                <h4>Requirements</h4>
                                <div className="course-requirements-text">
                                    <ul>
                                        <li>• High School Mathematics Level</li>
                                        <li>• Basic Python Knowledge Required</li>
                                        <li>• Broadband Internet</li>
                                    </ul>
                                </div>
                            </div>
                            <ProductCurriculiam />
                            <ProductDetailsInstructor img={instructorImg} />
                            
                           
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
                        <ProductDetailSidebar />
                    </div>
                </div>
                <div className='container grid grid-cols-2 items-center mt-40'>
                            <ContactFormSection />
                            </div>
        </section>
    );
};

export default SingleProductDetail;