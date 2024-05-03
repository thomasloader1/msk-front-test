"use client";
import LayoutPage from "@/components/MSK/LayoutPage";
import AccountHome from "@/components/MSK/account/AccountHome";
import AccountCourses from "@/components/MSK/account/AccountCourses";
import AccountPersonalData from "@/components/MSK/account/AccountPersonalData";
import { ComponentType, FC, useContext, useEffect, useState } from "react";
// import AccountCourses from "@/components/MSK/account/AccountCourses";
// import AccountHome from "@/components/MSK/account/AccountHome";
// import { Helmet } from "react-helmet";
import { User, UserCourseProgress } from "@/data/types";
// import LoadingText from "@/components/Loader/Text";
import ModalSignOut from "@/components/Modal/SignOut";
// import { getUserCourses } from "Services/user";
import { AuthContext } from "@/context/user/AuthContext";
import { DataContext } from "@/context/data/DataContext";
import api from "../../../../../Services/api";
import { getUserCourses } from "../../../../../Services/user";
import NcLink from "@/components/NcLink/NcLink";
import { Switch } from "@headlessui/react";

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
  // let { path, url } = useRouteMatch();
  // const history = useHistory();
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //setCourses(allProductsMX);
    fetchUser();
  }, [state?.profile?.contact?.courses_progress]);

  const fetchUser = async () => {
    // setLoading(true);

    const res = await api.getUserData();
    if (!res.message) {
      if (!res.contact.state) res.contact.state = "";
      setUser(res);
      dispatch({
        type: "FRESH",
        payload: {
          user: { name: res.name, speciality: res.contact.speciality },
        },
      });
      // let coursesList = getUserCourses(res, allProductsMX);
      // setCourses(coursesList);
      // setLoading(false);
    } else {
      // history.push("/iniciar-sesion");
    }
  };

  return (
    <div
      className={`nc-PageDashboard animate-fade-down ${className}`}
      data-nc-id="PageDashboard"
    >
      <AccountHome name={user?.contact?.name!} />
    </div>
  );
};

export default PageDashboard;
