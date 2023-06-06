import React, { FC, useEffect, useRef, useState } from "react";
import { SinglePageType } from "../PageMission";
import { useLocation } from "react-router";
import SectionSliderPosts from "../home/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import axios from "axios";
import { API_URL } from "data/api";

export interface SingleContentProps {
    data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
    console.log({ data })
    const [courses, setCourses] = useState([]);
    const { tags, author, commentCount, comments, excerpt, contenido } = data;
    const commentRef = useRef<HTMLDivElement>(null);
    //
    const location = useLocation();

    const fetchCourses = async () => {
        const res = await axios.get(`${API_URL}/products?country=mx`);
        setCourses(res.data.products);
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        //  SCROLL TO COMMENT AREA
        if (location.hash !== "#comment") {
            return;
        }
        //
        if (location.hash === "#comment") {
            setTimeout(() => {
                if (commentRef.current) {
                    commentRef.current.scrollIntoView();
                }
            }, 500);
        }
    }, [location]);

    return (
        <div className="nc-SingleContent space-y-10">
            {/* ENTRY CONTENT */}
            <div
                id="single-entry-content"
                className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
            >
                <div className="font-lora text-xl" dangerouslySetInnerHTML={{ __html: contenido }} />
                <p className="font-lora text-slate-500 text-xl">
                    ¿Te gustaría alcanzar nuevos objetivos y obtener un mayor
                    reconocimiento en tu profesión?
                </p>
            </div>

            {/* TAGS */}
            <div className="relative py-16 my-32">
                <BackgroundSection />
                <SectionSliderPosts
                    postCardName="card9"
                    heading="Comienza tu experiencia aquí"
                    subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
                    sliderStype="style2"
                    posts={courses}
                    uniqueSliderClass="pageHome-section6"
                />
            </div>
        </div>
    );
};

export default SingleContent;
