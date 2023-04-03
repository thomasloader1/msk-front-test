import React from 'react';
import fai from "../../styles/fai/fontAwesome5Pro.module.css"
const StorePagination = () => {
    return (
        <div className="edu-pagination mt-30 mb-20">
            <ul>
                <li><a href="#"><i className={`${fai.fal} ${fai["fa-angle-left"]}`}></i></a></li>
                <li className="active"><a href="#"><span>01</span></a></li>
                <li><a href="#"><span>02</span></a></li>
                <li><a href="#"><i className={`${fai.fal} ${fai["fa-angle-right"]}`}></i></a></li>
            </ul>
        </div>
    );
};

export default StorePagination;