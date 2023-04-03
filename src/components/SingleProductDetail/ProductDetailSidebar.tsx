import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import img from "../../images/eduman/course-video.png"
import fai from '../../styles/fai/fontAwesome5Pro.module.css'

const ProductDetailSidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const openVideoModal = () => setIsOpen(!isOpen);

    return (
        <div className="course-video-widget">
            <div className="course-widget-wrapper mb-30">
                <ModalVideo channel='youtube' isOpen={isOpen} videoId='vWLcyFtni6U' onClose={() => { openVideoModal(); }} />
                <div className="course-video-thumb w-img">
                    <img src={img} alt="img not found" />
                    <div className="sidber-video-btn">
                        <span className="popup-video" onClick={() => { openVideoModal(); }}><i className={`${fai.fas} ${fai["fa-play"]}`}></i></span>
                    </div>
                </div>
                <div className="course-video-price">
                    <span>$147.00</span>
                </div>
                <div className="course-video-body">
                    <ul>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-filter"></i>
                                <span>Level</span>
                            </div>
                            <div className="video-corse-info">
                                <span>Beginners</span>
                            </div>
                        </li>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-computer"></i>
                                <span>Lectures</span>
                            </div>
                            <div className="video-corse-info">
                                <span>8 Lectures</span>
                            </div>
                        </li>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-clock"></i>
                                <span>Duration</span>
                            </div>
                            <div className="video-corse-info">
                                <span>1h 30m 12s</span>
                            </div>
                        </li>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-menu-2"></i>
                                <span>Category</span>
                            </div>
                            <div className="video-corse-info">
                                <span>Data Science</span>
                            </div>
                        </li>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-global"></i>
                                <span>Laguage</span>
                            </div>
                            <div className="video-corse-info">
                                <span>English</span>
                            </div>
                        </li>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-bookmark-white"></i>
                                <span>Access</span>
                            </div>
                            <div className="video-corse-info">
                                <span>Full Lifetime</span>
                            </div>
                        </li>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-award"></i>
                                <span>Certificate</span>
                            </div>
                            <div className="video-corse-info">
                                <span>Yes </span>
                            </div>
                        </li>
                        <li>
                            <div className="course-vide-icon">
                                <i className="flaticon-list"></i>
                                <span>Recourse</span>
                            </div>
                            <div className="video-corse-info">
                                <span>5 Downloadable Files </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="video-wishlist">
                    <Link to="/cart" className="video-cart-btn"><i className="fal fa-shopping-cart"></i>Add to cart</Link>
                    <Link to="/wishlist" className="video-wishlist-btn"><i className="far fa-heart"></i>Add to Wishlist</Link>
                </div>
                <div className="course-gift">
                    <div className="course-apply-coupon">
                        <a href="#">Apply Coupon</a>
                    </div>
                    <div className="course-gift-coupon">
                        <a href="#">Gift Courses</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSidebar;