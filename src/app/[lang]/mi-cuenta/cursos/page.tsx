"use client";
import AccountCourses from "@/components/MSK/account/AccountCourses";
import { ComponentType, FC, useContext, useEffect, useState } from "react";
import { User, UserCourseProgress } from "@/data/types";
import { AuthContext } from "@/context/user/AuthContext";
import api from "../../../../../Services/api";
import { getUserCourses } from "../../../../../Services/user";
import ItemSkeleton from "@/components/Skeleton/ItemSkeleton";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";

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
  const [courses, setCourses] = useState<UserCourseProgress[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [state?.profile]);

  const fetchUser = async () => {
    setLoading(true);
    const res = await api.getUserData();
    const coursesList = await api.getAllCourses();
    if (!res.message) {
      if (!res.contact.state) res.contact.state = "";
      setUser(res);
      dispatch({
        type: "FRESH",
        payload: {
          user: { name: res.name, speciality: res.contact.speciality },
        },
      });
      let userCoursesList = getUserCourses(res, coursesList);
      setCourses(userCoursesList);
      setLoading(false);
    } else {
      // history.push("/iniciar-sesion");
    }
  };

  return (
    <div
      className={`nc-PageDashboard animate-fade-down ${className}`}
      data-nc-id="PageDashboard"
    >
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <AccountCourses courses={courses} email={user?.contact?.email!} />
      )}
    </div>
  );
};

export default PageDashboard;
