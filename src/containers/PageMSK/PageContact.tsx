import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC, useEffect, useState } from "react";
import ContactForm from "components/ContactForm/ContactForm";
import { Helmet } from "react-helmet";
import { Profession, Specialty, User, UserCourseProgress } from "data/types";
import api from "Services/api";
import { useHistory } from "react-router-dom";
import { getUserCourses } from "Services/user";

export interface PageContactProps {
  className?: string;
}
const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  const [user, setUser] = useState<User>({} as User);
  const [courses, setCourses] = useState<UserCourseProgress[]>(
    [] as UserCourseProgress[]
  );
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const specialtyList = await api.getSpecialties();
    setSpecialties(specialtyList);
  };

  const history = useHistory();
  const fetchUser = async () => {
    const allCourses = await api.getAllProductsMX();
    const res = await api.getUserData();
    if (!res.message) {
      if (!res.contact.state) res.contact.state = "";
      setUser(res);

      let coursesList = getUserCourses(res, allCourses);
      setCourses(coursesList);
      setLoading(false);
    } else {
      console.log(res.response.status);
      history.push("/iniciar-sesion");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();
    fetchProfessions();
    fetchSpecialties();
  }, []);

  return (
    <div
      className={`nc-PageDashboard ${className} animate-fade-down`}
      data-nc-id="PageDashboard"
    >
      <Helmet>
        <title>Contacto</title>
      </Helmet>
      <LayoutPage
        heading="Contacto"
        subHeading="Completa el formulario y en breve nos comunicaremos contigo"
      >
        <ContactForm hideHeader />
      </LayoutPage>
    </div>
  );
};

export default PageContact;
