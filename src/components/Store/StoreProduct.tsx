import React from 'react'
import course1 from "../../images/eduman/course-01.jpg"
import { Link } from 'react-router-dom'
import fai from '../../styles/fai/fontAwesome5Pro.module.css'


const StoreProduct = () => {
    return (
        <div className="protfolio-course-2-wrapper mb-30">
            <div className="student-course-img">
                <Link to="/course-details"><img src={course1} alt="course-img" /></Link>
            </div>
            <div className="course-cart">
                <div className="course-info-wrapper">
                    <div className="cart-info-body">
                        <Link to="/course" className="category-color category-color-1">Development</Link>
                        <Link to="/course-details"><h3>Python and Django Full Stack Web Developer Bootcamp</h3></Link>
                        <div className="cart-lavel">
                            <h5>Level : <span>Beginner</span></h5>
                            <p>Knowledge is power. Information is liberating. Education is the premise of
                                progress, in every society, in every family</p>
                        </div>
                        <div className="info-cart-text">
                            <ul>
                                <li><i className="far fa-check"></i>Scratch to HTML</li>
                                <li><i className="far fa-check"></i>Learn how to code in Python</li>
                                <li><i className="far fa-check"></i>Unlimited backend database creation</li>
                                <li><i className="far fa-check"></i>Adobe XD Tutorials</li>
                            </ul>
                        </div>
                        <div className="course-action">
                            <Link to="/course-details" className="view-details-btn">View Details</Link>
                            <button className="wishlist-btn"><i className="flaticon-like"></i></button>
                            <Link to="/course-details" className="c-share-btn"><i className="flaticon-previous"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="portfolio-course-2-content">
                <div className="portfolio-course-wrapper">
                    <div className="portfolio-price">
                        <span>$12.57</span>
                        <del>$24.50</del>
                    </div>
                    <div className="portfolio-course-2">
                        <h3><Link to="/course-details">Python and Django Full Stack Web Developer Bootcamp</Link></h3>
                    </div>
                    <div className="course-icon">
                        <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                        <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                        <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                        <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                        <i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                        <span>(25)</span>
                    </div>
                </div>
            </div>
            <div className="course-2-footer">
                <div className="coursee-clock">
                    <i className="flaticon-clock"></i><span>1:33 Min</span>
                </div>
                <div className="course-creadit">
                    <i className="flaticon-menu-1"></i><span>8 Credit</span>
                </div>
                <div className="course-network">
                    <i className={`${fai.fal} ${fai["fa-signal"]} mr-10`}></i><span>Fresh</span>
                </div>
            </div>
        </div>
    )
}

export default StoreProduct