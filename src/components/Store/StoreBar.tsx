import React from 'react';

const StoreBar = () => {
    return (
        <div className=" course-bar-up-area">
            <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="course-main-wrapper mb-30">
                            <div className="bar-filter">
                                <i className="flaticon-filter"></i>
                                <span>Filter</span>
                                <span>(2)</span>
                            </div>
                            <div className="corse-bar-wrapper">
                                <div className="bar-search">
                                    <form action="#">
                                        <div className="bar-secrch-icon position-relative">
                                            <input type="text" placeholder="Search keyword..." />
                                            <button type="submit"><i className="far fa-search"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="course-sidebar-tab">
                                <div className="course-sidebar-wrapper">
                                    <div className="curse-tab-left-wrap">
                                        <div className="course-results">
                                            Showing <span className="course-result-showing">15</span> of <span
                                                className="course-result-number">60</span> results
                                        </div>
                                    </div>
                                    <div className="couse-dropdown">
                                        <div className="course-drop-inner">
                                            <select>
                                                <option>Newly published</option>
                                                <option>Most Viewed</option>
                                                <option>5 Star Rated</option>
                                                <option>Duration</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default StoreBar;