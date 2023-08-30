import React, { FC, useEffect, useRef, useState } from "react";
import { SinglePageType, ThemesToSeeType } from "../PageMission";
import { useLocation } from "react-router";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import { Link } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import NoteAuthors from "../../../components/SingleProductDetail/NoteAuthors";
import api from "Services/api";
import NoteExtraData from "components/NoteExtraData/NoteExtraData";

export interface SingleContentProps {
  data: SinglePageType;
  sources?: string[];
}

const SingleContent: FC<SingleContentProps> = ({ data, sources }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [bottomDistance, setBottomDistance] = useState(0);

  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const { author, contenido, date, themes_to_se } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialtiesGroups, setSpecialtiesGroup] = useState<any[]>([]);
  const fetchPosts = async () => {
    const posts = await api.getPosts();
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    const courseList = data.the_most_read.map((course: any) => {
      var urlParts = course.link.split("/");
      return { ...course, slug: urlParts[urlParts.length - 2] };
    });
    fetchPosts();
    setRecommendedCourses(courseList);
  }, [data]);

  useEffect(() => {
    if (location.hash !== "#comment") {
      return;
    }
    if (location.hash === "#comment") {
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView();
        }
      }, 500);
    }
  }, [location]);

  let scrollPosition = 0;

  const calculateDistanceToBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    return documentHeight - (scrollPosition + windowHeight);
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 900;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop > threshold);

      const distanceToBottom = calculateDistanceToBottom();
      const auxDistance = scrollPosition - distanceToBottom - 100;
      setBottomDistance(distanceToBottom < 550 ? auxDistance / 3 : 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let groupedSpecialties: any = [];
    posts.forEach((post: { specialty: string }, index) => {
      let specialty = post.specialty;

      if (!groupedSpecialties[specialty]) {
        groupedSpecialties[specialty] = [];
      }
      groupedSpecialties[specialty].push(post);
    });

    setSpecialtiesGroup(groupedSpecialties);
  }, [posts]);

  //const [firstContent, secondContent, ...restContent] = themes_to_se?.filter((tts, i) => i >= 1);
  return (
    <div className="nc-SingleContent space-y-10 ">
      {/* ENTRY CONTENT */}
      <div className="grid grid-cols-12 gap-4">
        <div className="content-container col-span-12 lg:col-span-8 animate-fade-down">
          <CardAuthor2 className="relative my-4" date={date} author={author} />
          <div
            id="single-entry-content"
            className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          >
            {themes_to_se && (
              <>
                <h2>Qué temas verás</h2>
                <ul className="pr-5">
                  {themes_to_se.map((tts, index) => (
                    <li key={`${tts.id}_${index}`}>
                      <a className="text-primary" href={`#${tts.id}`}>
                        {tts.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div
                  className="text-xl font-lora font-normal lg:pr-20"
                  dangerouslySetInnerHTML={{
                    __html: themes_to_se[0]?.introduction as string,
                  }}
                />
                <NoteExtraData excerpt={data.excerpt} />
              </>
            )}
            <ul className="themes-to-see">
              {themes_to_se?.map((tts, index) => (
                <li key={`content_${tts.id}_${index}`}>
                  <h3 id={tts.id}>{tts.title}</h3>
                  {tts.content && (
                    <div dangerouslySetInnerHTML={{ __html: tts.content }} />
                  )}
                  {index == 0 && (
                    <NoteExtraData featured_text={data.featured_text_field} />
                  )}
                </li>
              ))}
            </ul>
            <NoteExtraData suggest_content={data.suggest_content} />
            <p className="font-lora text-slate-500 text-xl">
              ¿Te gustaría alcanzar nuevos objetivos y obtener un mayor
              reconocimiento en tu profesión?
            </p>
            <div>
              <h4 className="source-title">Fuente/s:</h4>
              {sources && sources.length > 0
                ? sources.map((source, index) => {
                    return (
                      <p key={`source_${index}`} className="source-content">
                        {source}
                      </p>
                    );
                  })
                : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.length > 0
                ? data.tags.map((tag, index) => {
                    return (
                      <span key={`tag_${index}`} className="tag-content">
                        #{tag.name}
                      </span>
                    );
                  })
                : null}
            </div>
            {data.authors && data.authors.length > 0
              ? data.authors?.map((currentAuthor, index) => {
                  return (
                    <NoteAuthors
                      key={`note_author_${index}`}
                      instructor={currentAuthor}
                    />
                  );
                })
              : null}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 relative course-video-widget">
          <div
            className={`${
              isFixed && bottomDistance == 0
                ? "col-span-12 lg:col-span-4 post-side-data lg:fixed lg:max-w-[330px] xl:max-w-[420px]"
                : "col-span-12 lg:col-span-4 post-side-data"
            } ${bottomDistance != 0 ? "lg:post-side-data-bottom" : ""}`}
          >
            <div className="side-content rounded-2xl ">
              <div className="flex w-full">
                <h5 className="side-content-header p-3">🎯 Los más leídos</h5>
                <Link
                  to={`/archivo`}
                  className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4"
                >
                  Ver todos
                </Link>
              </div>
              {recommendedCourses.map((course: any, index: number) => (
                <Link
                  to={`/blog/${course.slug}`}
                  key={`rc_${index}`}
                  className="side-content-course"
                >
                  <NcImage
                    containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-12 lg:w-12"
                    src={course.image}
                  />
                  <p>
                    <span className="category">{course.category}</span>
                    <span>{course.title}</span>
                  </p>
                </Link>
              ))}
            </div>
            <div className="side-content rounded-2xl ">
              <div className="flex w-full">
                <h5 className="side-content-header p-3">💼 Especialidades </h5>
                <Link
                  to={`/archivo`}
                  className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4"
                >
                  Ver todas
                </Link>
              </div>
              {Object.keys(specialtiesGroups).map((specialty, index) => (
                <Link
                  to={`/archivo?especialidad=${specialty}`}
                  key={`rc_${index}`}
                  className="side-content-course"
                >
                  <NcImage
                    containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-10 lg:w-10"
                    src={Object.values(specialtiesGroups)[index][0].image}
                  />
                  <p>
                    <span> {specialty == "null" ? "Otras" : specialty}</span>
                    <span className="category">
                      {Object.values(specialtiesGroups)[index].length} artículos
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* TAGS */}
      {/* <div className="relative py-16 my-32">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading="Comienza tu experiencia aquí"
          subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
          sliderStype="style2"
          posts={courses}
          uniqueSliderClass="pageHome-section6"
        />
      </div> */}
    </div>
  );
};

export default SingleContent;
