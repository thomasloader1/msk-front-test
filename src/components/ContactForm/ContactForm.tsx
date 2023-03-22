import React from 'react';
import '../../styles/scss/main.scss'
import bts from '../../styles/bts.module.css';
import ContactSidebar from './ContactSidebar';


const ContactFormSection = () => {
    return (
        <div className={bts.row}>
            <div className={`${bts["col-xl-8"]} ${bts["col-lg-7"]} ${bts["col-md-12"]}`}>
                <div className="contact-area-wrapper">
                    <div className={`section-title mb-50`}>
                        <h2>Get in Touch</h2>
                    </div>
                    <div className="contact-form">
                        <form action="#">
                            <div className={bts.row}>
                                <div className={`${bts["col-xl-6"]}`}>
                                    <div className="contact-from-input mb-10">
                                        <input type="text" placeholder="Name" />
                                    </div>
                                </div>
                                <div className={`${bts["col-xl-6"]}`}>
                                    <div className="contact-from-input mb-10">
                                        <input type="text" placeholder="Phone" />
                                    </div>
                                </div>
                                <div className={`${bts["col-xl-6"]}`}>
                                    <div className="contact-from-input mb-10">
                                        <input type="text" placeholder="Email" />
                                    </div>
                                </div>
                                <div className={`${bts["col-xl-6"]}`}>
                                    <div className="contact-select">
                                        <select className="mb-10">
                                            <option defaultValue="Subject">Course</option>
                                            <option defaultValue="Subject">Financial Aid</option>
                                            <option defaultValue="Subject">Payment</option>
                                            <option defaultValue="Subject">Information</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`${bts["col-xl-12"]}`}>
                                    <div className="contact-from-input mb-10">
                                        <textarea placeholder="Message" name="message"></textarea>
                                    </div>
                                </div>
                                <div className={`${bts["col-xl-2"]}`}>
                                    <div className="cont-btn mb-10">
                                        <button type='button' className="cont-btn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`${bts["col-xl-4"]} ${bts["col-lg-5"]} ${bts["col-md-8"]}`}>
                <ContactSidebar />
            </div>
        </div>

    );
};

export default ContactFormSection;