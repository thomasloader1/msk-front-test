import React from 'react';
import '../../styles/scss/main.scss'
import ContactSidebar from './ContactSidebar';


const ContactFormSection = () => {
    return (
        <>
            <div className="">
                <div className="contact-area-wrapper">
                    <div className="section-title mb-50">
                        <h2>Get in Touch</h2>
                    </div>
                    <div className="contact-form">
                        <form action="#" className=''>
                            <div className="grid grid-row-6 gap-4">
                                <div className="col-xl-6">
                                    <div className="contact-from-input">
                                        <input type="text" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="contact-from-input ">
                                        <input type="text" placeholder="Phone" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="contact-from-input ">
                                        <input type="text" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="contact-select">
                                        <select className="">
                                            <option defaultValue="Subject">Course</option>
                                            <option defaultValue="Subject">Financial Aid</option>
                                            <option defaultValue="Subject">Payment</option>
                                            <option defaultValue="Subject">Information</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="contact-from-input ">
                                        <textarea placeholder="Message" name="message"></textarea>
                                    </div>
                                </div>
                                <div className="col-xl-2 ">
                                    <div className="cont-btn ">
                                        <button type='button' className="cont-btn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="">
                <ContactSidebar />
            </div>
        </>

    );
};

export default ContactFormSection;