import LayoutPage from "components/LayoutPage/LayoutPage";
import React, {
  ComponentType,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import ContactForm from "components/ContactForm/ContactForm";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import AccountPayment from "./account/AccountPayment";
import AccountPersonalData from "./account/AccountPersonalData";
import AccountCourses from "./account/AccountCourses";
import AccountHome from "./account/AccountHome";
import { Helmet } from "react-helmet";
import { Profession, Specialty, User, UserCourseProgress } from "data/types";
import api from "Services/api";
import { useHistory } from "react-router-dom";
import LoadingText from "components/Loader/Text";
import axios from "axios";
import { ALL_PRODUCTS_MX } from "../../data/api";
import ModalSignOut from "components/Modal/SignOut";
import { getUserCourses } from "Services/user";

export interface PageDashboardProps {
  className?: string;
}

interface DashboardLocationState {
  "/inicio"?: {};
  "/cursos"?: {};
  "/perfil"?: {};
  "/metodo-pego"?: {};
  "/cerrar-sesion"?: {};
}

interface DashboardPage {
  sPath: keyof DashboardLocationState;
  exact?: boolean;
  component: ComponentType<Object>;
  icon: string;
  pageName: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  let { path, url } = useRouteMatch();
  const [user, setUser] = useState<User>({} as User);
  const [courses, setCourses] = useState<UserCourseProgress[]>(
    [] as UserCourseProgress[]
  );
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalLogout = () => {
    setIsModalOpen(!isModalOpen);
  };
  const subPages: DashboardPage[] = [
    {
      sPath: "/inicio",
      exact: true,
      component: () => <AccountHome name={user?.contact?.name!} />,
      icon: "home",
      pageName: "Inicio",
    },
    {
      sPath: "/cursos",
      component: () => (
        <AccountCourses courses={courses} email={user?.contact?.email!} />
      ),
      icon: "file",
      pageName: "Mis cursos",
    },
    {
      sPath: "/perfil",
      component: () => (
        <AccountPersonalData
          user={user}
          specialties={specialties}
          professions={professions}
        />
      ),
      icon: "personal-data",
      pageName: "Datos personales",
    },
  ];

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
    const allCourses = await axios.get(`${ALL_PRODUCTS_MX}`);
    console.log({ allCourses });
    const res = await api.getUserData();
    if (!res.message) {
      if (!res.contact.state) res.contact.state = "";
      setUser(res);

      let coursesList = getUserCourses(res, allCourses.data.products);
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

  console.log({ courses });

  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Mi cuenta</title>
      </Helmet>
      <LayoutPage
        heading="Contacto"
        subHeading="Completa el formulario y en breve nos comunicaremos contigo"
      >
        <ContactForm hideHeader />
      </LayoutPage>
      <ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PageDashboard;
