import React, { useReducer } from 'react';
import fai from '../../styles/fai/fontAwesome5Pro.module.css'

const initialState = {
    isActive: true,
    isActiveA: true,
    isActiveB: true,
    isActiveC: true,
    isActiveD: true,
    isActiveE: true
}
const reducer = (state, action) => {
    switch (action) {
        case "categories":
            return {
                ...state,
                isActive: !state.isActive,
            };
        case "ratings":
            return {
                ...state,
                isActiveA: !state.isActiveA,
            };
        case "price":
            return {
                ...state,
                isActiveB: !state.isActiveB,
            };
        case "durations":
            return {
                ...state,
                isActiveE: !state.isActiveE,
            };
        default:
            throw new Error("Unexpected action");
    }
};

const StoreSideBar = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    console.log({state})

    return (

        <>
            <div className="course-sidebar-widget mb-2">
                <div className={`course-sidebar-info ${state.isActive ? "content-visiable" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("categories")}>Categories</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-bus" />
                                <label className="edu-check-label" htmlFor="e-bus">Business (12)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-dev" />
                                <label className="edu-check-label" htmlFor="e-dev">Development (9)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-data" />
                                <label className="edu-check-label" htmlFor="e-data">Data Science (25)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-art" />
                                <label className="edu-check-label" htmlFor="e-art">Arts and Design (10)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-fin" />
                                <label className="edu-check-label" htmlFor="e-fin">Finance (8)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-mark" />
                                <label className="edu-check-label" htmlFor="e-mark">Marketing (22)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-per" />
                                <label className="edu-check-label" htmlFor="e-per">Management (12)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-heal" />
                                <label className="edu-check-label" htmlFor="e-heal">Health and Fitness (5)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-photo" />
                                <label className="edu-check-label" htmlFor="e-photo">Photography (18)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-music" />
                                <label className="edu-check-label" htmlFor="e-music">Music (21)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-acad" />
                                <label className="edu-check-label" htmlFor="e-acad">Academic (16)</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-2">
                <div className={`course-sidebar-info ${state.isActiveA ? "content-visiable" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("ratings")}>Ratings</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-25" name="rating" />
                                <label className="edu-check-star" htmlFor="e-25">
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    (25)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-24" name="rating" />
                                <label className="edu-check-star" htmlFor="e-24">
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                                    (25)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-12" name="rating" />
                                <label className="edu-check-star" htmlFor="e-12">
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                                    (12)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-28" name="rating" />
                                <label className="edu-check-star" htmlFor="e-28">
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                                    <i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                                    (28)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-14" name="rating" />
                                <label className="edu-check-star" htmlFor="e-14">
                                    <i className={`${fai.fas} ${fai["fa-star"]}`}>
                                    </i> <i className={`${fai.fal} ${fai["fa-star"]}`}>
                                    </i> <i className={`${fai.fal} ${fai["fa-star"]}`}>
                                    </i><i className={`${fai.fal} ${fai["fa-star"]}`}>
                                    </i><i className={`${fai.fal} ${fai["fa-star"]}`}></i>
                                    (14)</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-2">
                <div className={`course-sidebar-info ${state.isActiveB ? "content-visiable" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("price")}>Price</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-85" name="price" />
                                <label className="edu-check-label" htmlFor="e-85">All (85)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-all" name="price" />
                                <label className="edu-check-label" htmlFor="e-all">Free (21)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="f-all" name="price" />
                                <label className="edu-check-label" htmlFor="f-all">Paid (54)</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="course-sidebar-widget mb-2">
                <div className={`course-sidebar-info ${state.isActiveE ? "content-visiable" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("durations")}>Duration</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-less" />
                                <label className="edu-check-label" htmlFor="e-less">Less than 1 Hours (24)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="e-36" />
                                <label className="edu-check-label" htmlFor="e-36">1-2 Hours (36)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="m-25" />
                                <label className="edu-check-label" htmlFor="m-25">2-5 Hours (25)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="m-32" />
                                <label className="edu-check-label" htmlFor="m-32">6-7 Hours (32)</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id="m-11" />
                                <label className="edu-check-label" htmlFor="m-11">7-10 Hours (11)</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default StoreSideBar;