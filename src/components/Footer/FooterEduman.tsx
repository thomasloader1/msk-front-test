import React from 'react'
import { Link } from 'react-router-dom'
import bts from '../../styles/bts.module.css'

const FooterEduman = () => {
  return (
    <footer>
    <div className="footer-area pt-100">
        <div className={bts.container}>
            <div className="footer-main">
                <div className={bts.row}>
                    <div className={`${bts["col-xl-3"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}>
                        <div className="footer-widget f-w1 mb-20">
                            <div className="footer-img">
                                <Link to="/"><img src="/assets/img/logo/footer-logo.png" alt="footer-logo" /></Link>
                                <p>Great lesson ideas and lesson plans for ESL teachers! Educators can customize lessons as best plans to knowledge.</p>
                            </div>
                            <div className="footer-icon">
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className={`${bts["col-xl-3"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}>
                        <div className="footer-widget f-w2 mb-20">
                            <h3>Online Platform</h3>
                            <ul>
                                <li><Link to="/course">Proper Guidelines</Link></li>
                                <li><Link to="/course">Digital Library</Link></li>
                                <li><Link to="/course">Compare Us</Link></li>
                                <li><Link to="/become-instructor">Become Instructor</Link></li>
                                <li><Link to="/course">Build Career</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${bts["col-xl-3"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}>
                        <div className="footer-widget f-w3 mb-20">
                            <h3>Browse Courses</h3>
                            <ul>
                                <li><Link to="/course">Development</Link></li>
                                <li><Link to="/course">Business</Link></li>
                                <li><Link to="/course">Health and Fitness</Link></li>
                                <li><Link to="/course">Life Styles</Link></li>
                                <li><Link to="/course">Photography</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${bts["col-xl-3"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}>
                        <div className="footer-widget f-w4 mb-20">
                            <h3>Insight Community</h3>
                            <ul>
                                <li><Link to="/course">Global Partners</Link></li>
                                <li><Link to="/contact">Forum</Link></li>
                                <li><Link to="/contact">Help and Support</Link></li>
                                <li><Link to="/contact">Community</Link></li>
                                <li><Link to="/faq-page">Documentation</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className={bts.container}>
                    <div className={bts.row}>
                        <div className={`${bts["col-xl-3"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}>
                            <div className="copyright-text border-line">
                                <p>© Copyrighted and Designed by <a href="https://themeforest.net/user/bdevs"><span>BDevs</span></a></p>
                            </div>
                        </div>
                        <div className={`${bts["col-xl-4"]} ${bts["col-lg-4"]} ${bts["col-sm-6"]}`}>
                            <div className="copy-right-support border-line-2">
                                <div className="copy-right-svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43.945" height="50"
                                        viewBox="0 0 43.945 50">
                                        <g id="headphones" transform="translate(-31)">
                                            <g id="Group_2171" data-name="Group 2171" transform="translate(36.859 20.508)">
                                                <g id="Group_2170" data-name="Group 2170">
                                                    <path id="Path_2983" data-name="Path 2983"
                                                        d="M95.395,210A4.4,4.4,0,0,0,91,214.395v11.914a4.395,4.395,0,1,0,8.789,0V214.395A4.4,4.4,0,0,0,95.395,210Z"
                                                        transform="translate(-91 -210)" fill="#2467ec" />
                                                </g>
                                            </g>
                                            <g id="Group_2173" data-name="Group 2173" transform="translate(31 23.669)">
                                                <g id="Group_2172" data-name="Group 2172">
                                                    <path id="Path_2984" data-name="Path 2984"
                                                        d="M33.93,243.6a7.268,7.268,0,0,1,.125-1.234A4.386,4.386,0,0,0,31,246.529v6.055a4.386,4.386,0,0,0,3.054,4.163,7.268,7.268,0,0,1-.125-1.234Z"
                                                        transform="translate(-31 -242.366)" fill="#2467ec" />
                                                </g>
                                            </g>
                                            <g id="Group_2175" data-name="Group 2175" transform="translate(48.578 20.508)">
                                                <g id="Group_2174" data-name="Group 2174">
                                                    <path id="Path_2985" data-name="Path 2985"
                                                        d="M227.113,210a4.4,4.4,0,0,0-4.395,4.395v11.914a4.4,4.4,0,0,0,4.395,4.395,4.335,4.335,0,0,0,1.259-.206,4.386,4.386,0,0,1-4.189,3.136h-4.664a4.395,4.395,0,1,0,0,2.93h4.664a7.333,7.333,0,0,0,7.324-7.324V214.395A4.4,4.4,0,0,0,227.113,210Z"
                                                        transform="translate(-211 -210)" fill="#2467ec" />
                                                </g>
                                            </g>
                                            <g id="Group_2177" data-name="Group 2177" transform="translate(71.891 23.669)">
                                                <g id="Group_2176" data-name="Group 2176">
                                                    <path id="Path_2986" data-name="Path 2986"
                                                        d="M449.722,242.366a7.266,7.266,0,0,1,.125,1.234v11.914a7.266,7.266,0,0,1-.125,1.234,4.386,4.386,0,0,0,3.055-4.163v-6.055A4.386,4.386,0,0,0,449.722,242.366Z"
                                                        transform="translate(-449.722 -242.366)" fill="#2467ec" />
                                                </g>
                                            </g>
                                            <g id="Group_2179" data-name="Group 2179" transform="translate(31)">
                                                <g id="Group_2178" data-name="Group 2178">
                                                    <path id="Path_2987" data-name="Path 2987"
                                                        d="M52.973,0A22,22,0,0,0,31,21.973v.037a7.253,7.253,0,0,1,3-1.361,19.02,19.02,0,0,1,37.952,0,7.256,7.256,0,0,1,3,1.361v-.037A22,22,0,0,0,52.973,0Z"
                                                        transform="translate(-31)" fill="#2467ec" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div className="copyright-svg-content">
                                    <p>Have a question? Call us 24/7</p>
                                    <h5><a href="tel:(987)547587587">(987) 547587587</a></h5>
                                </div>
                            </div>
                        </div>
                        <div className={`${bts["col-xl-5"]} ${bts["col-lg-5"]} ${bts["col-md-12"]}`}>
                            <div className="copyright-subcribe">
                                <form action="#" className="widget__subscribe">
                                    <div className="field">
                                        <input type="email" placeholder="Enter Email" />
                                    </div>
                                    <button type="submit">Subscribe<i className="fas fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default FooterEduman