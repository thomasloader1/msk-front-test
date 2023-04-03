import React, { FC } from 'react';
import fai from "../../styles/fai/fontAwesome5Pro.module.css"
interface Props{
    img: string;
}

const ProductDetailsInstructor: FC<Props> = ({img}) => {
    return (
        <div className="course-instructors">
            <h3>instructors</h3>
            <div className="instructors-heading">
                <div className="instructors-img w-img">
                    <img src={img} alt="img not found" />
                </div>
                <div className="instructors-body">
                    <h5>David Allberto</h5>
                    <span>Data Scientist, BDevs Ltd.</span>
                    <div className="intructors-review">
                        <i className={`${fai.fas} ${fai["fa-star"]}`}></i>
                        <span>4.7 (54 reviews)</span>
                    </div>
                    <div className="instructors-footer">
                        <i className={`${fai.fas} ${fai["fa-desktop"]}`}></i>
                        <span>3 Coursess</span>
                        <i className={`${fai.far} ${fai["fa-user-friends"]}`}></i>
                        <span>78,742 Students</span>
                    </div>
                </div>
            </div>
            <div className="intructors-content">
                <p>Professionally, I come from the Data Science consulting space with experience in
                    finance, retail, transport and other industries. I was trained by the best
                    analytics mentors at Deloitte Australia and since starting on Udemy I have
                    passed on my knowledge to spread around the world</p>
            </div>
        </div>
    );
};

export default ProductDetailsInstructor;