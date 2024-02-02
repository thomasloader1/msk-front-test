import React, { useContext, useEffect, useState } from "react";
import ButtonClose from "components/ButtonClose/ButtonClose";
import Logo from "components/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_MSK, NAVIGATION_USER } from "data/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import ButtonSecondary from "components/Button/ButtonSecondary";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { AuthContext } from "context/user/AuthContext";
import SearchProducts from "components/Header/SearchProducts";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import api from "Services/api";
import { slugifySpecialty } from "lib/Slugify";
import { useStoreFilters } from "context/storeFilters/StoreFiltersProvider";
import { DataContext } from "context/data/DataContext";

export interface NavMobileProps {
  data?: NavItemType[];
  userNav?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_MSK,
  userNav = NAVIGATION_USER,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-5 pb-1 text-base">
        {item.children?.map((item, index) => _renderItem(item, index, true))}{" "}
      </ul>
    );
  };

  const _renderMenuChildUser = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-5 pb-1 text-base">
        {item.children?.map((item, index) => _renderItem(item, index, true))}{" "}
      </ul>
    );
  };

  const _renderItemHasChild = (
    item: NavItemType,
    index: number,
    isChild: boolean
  ) => {
    return (
      <Disclosure key={index}>
        {({ open }) => (
          <li className="text-neutral-900 dark:text-white">
            <div
              className={`flex items-center font-regular text-md hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
                isChild ? "" : " tracking-wide"
              }`}
            >
              <Disclosure.Button
                as="button"
                className="py-2.5 px-4 flex flex-1 items-center select-none focus:outline-none focus:ring-0"
              >
                {item.name}
                {open ? (
                  <ChevronUpIcon
                    className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDownIcon
                    className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                    aria-hidden="true"
                  />
                )}
              </Disclosure.Button>
            </div>
            <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
          </li>
        )}
      </Disclosure>
    );
  };

  const _renderItemNoChild = (
    item: NavItemType,
    index: number,
    isChild: boolean
  ) => {
    return (
      <li key={index} className="text-neutral-900 dark:text-white">
        <NavLink
          exact
          strict
          className={`flex w-full items-center py-2.5 px-4 font-regular text-md hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
            isChild ? "" : " tracking-wide"
          }`}
          to={{
            pathname: item.href || undefined,
            search: item.search,
          }}
          activeClassName="text-secondary"
        >
          {item.name}
        </NavLink>
      </li>
    );
  };

  const _renderItem = (item: NavItemType, index: number, isChild: boolean) => {
    if (item.children) {
      return _renderItemHasChild(item, index, isChild);
    }
    return _renderItemNoChild(item, index, isChild);
  };

  const { state } = useContext(AuthContext);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  const { state: dataState } = useContext(DataContext);
  const { allStoreProfessions, allStoreSpecialties } = dataState;

  const resources: ResourceFilter[] = [
    { name: "Curso", id: 1 },
    { name: "Guías profesionales", id: 2 },
  ];
  const history = useHistory();
  const { storeFilters } = useStoreFilters();

  useEffect(() => {
    setProfessions(allStoreProfessions);
    setSpecialties(allStoreSpecialties);
  }, [allStoreProfessions, allStoreSpecialties]);

  const isChecked = (type: string, value: any) => {
    switch (type) {
      case "professions":
        return !!storeFilters[type as keyof typeof storeFilters].filter(
          (profession: any) => {
            return profession.slug == value.slug;
          }
        ).length;
      case "specialties":
        return !!storeFilters[type as keyof typeof storeFilters].filter(
          (specialty: any) => {
            return specialty.name == value.name;
          }
        ).length;
      case "resources":
        return !!storeFilters[type as keyof typeof storeFilters].filter(
          (resource: any) => {
            return resource.id == value.id;
          }
        ).length;
    }
  };

  const duration = [
    { name: "Hasta 100 horas", id: 1, value: "less_100" },
    { name: "De 100 a 300 horas", id: 2, value: "100_300" },
    { name: "Más de 300 horas", id: 3, value: "more_300" },
  ];

  const { addFilter, removeFilter, clearFilters } = useStoreFilters();

  const onChangeProfession = (profession: Profession) => {
    const professionExists = storeFilters.professions.filter(
      (item: Profession) => {
        return item.slug == profession.slug;
      }
    );
    if (professionExists.length) removeFilter("professions", profession);
    else addFilter("professions", profession);
  };

  const onChangeResource = (resource: ResourceFilter) => {
    const resourceExists = storeFilters.resources.filter(
      (item: ResourceFilter) => {
        return item.id == resource.id;
      }
    );
    if (resourceExists.length) {
      removeFilter("resources", resource);
    } else addFilter("resources", resource);
  };

  const onChangeDuration = (duration: DurationFilter) => {
    const durationExists = storeFilters.duration.filter(
      (item: DurationFilter) => {
        return item.value == duration.value;
      }
    );
    if (durationExists.length) {
      removeFilter("duration", duration);
    } else addFilter("duration", duration);
  };

  const location = useLocation();

  return (
    <div className="w-full h-full py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800 border-r border-transparent dark:border-neutral-700">
      <div className="py-6 px-5">
        <Logo isOnBlog={window.location.href.includes("blog")} />
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        <div className="z-10 px-4">
          <SearchProducts />
        </div>
        {data.map((item, index) => _renderItem(item, index, false))}
      </ul>
      {location.pathname.includes("/tienda") && (
        <ul className="flex flex-col py-6 px-2 space-y-1">
          <Disclosure>
            {({ open }) => (
              <li>
                <Disclosure.Button
                  as="button"
                  className="py-2.5 px-4 flex flex-1 items-center select-none focus:outline-none focus:ring-0"
                >
                  Especialidad
                  {open ? (
                    <ChevronUpIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel>
                  {specialties.length ? (
                    <ul className="pl-6 flex flex-col gap-2">
                      {specialties.map((specialty, index) => {
                        return (
                          <li key={`spe_${index}`}>
                            <div className="course-sidebar-list">
                              <input
                                className="edu-check-box"
                                type="checkbox"
                                id={`specialty_${specialty.name}`}
                                onChange={(event) => {
                                  /* onChangeSpecialty(specialty) */
                                  //console.error(specialty);
                                  history.push(
                                    `?especialidad=${slugifySpecialty(
                                      specialty.name
                                    )}&recurso=curso`
                                  );
                                }}
                                checked={isChecked("specialties", specialty)}
                              />
                              <label
                                className="edu-check-label"
                                htmlFor={`specialty_${specialty.name}`}
                              >
                                {specialty.name}
                              </label>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </Disclosure.Panel>
              </li>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <li>
                <Disclosure.Button
                  as="button"
                  className="py-2.5 px-4 flex flex-1 items-center select-none focus:outline-none focus:ring-0"
                >
                  Recurso
                  {open ? (
                    <ChevronUpIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel>
                  <ul className="pl-6 flex flex-col gap-2">
                    {resources.map((resource, index: number) => {
                      return (
                        <li key={index}>
                          <div className="course-sidebar-list">
                            <input
                              className="edu-check-box"
                              type="checkbox"
                              id={`res_${resource.id}`}
                              onChange={(event) => onChangeResource(resource)}
                              checked={isChecked("resources", resource)}
                            />
                            <label
                              className="edu-check-label"
                              htmlFor={`res_${resource.id}`}
                            >
                              {resource.name}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Disclosure.Panel>
              </li>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <li>
                <Disclosure.Button
                  as="button"
                  className="py-2.5 px-4 flex flex-1 items-center select-none focus:outline-none focus:ring-0"
                >
                  Profesión
                  {open ? (
                    <ChevronUpIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel>
                  <ul className="pl-6 flex flex-col gap-2">
                    {professions.map((profession, index: number) => {
                      return (
                        <li key={index}>
                          <div className="course-sidebar-list">
                            <input
                              className="edu-check-box"
                              type="checkbox"
                              id={`profession_${profession.id}`}
                              onChange={(event) =>
                                onChangeProfession(profession)
                              }
                              checked={isChecked("professions", profession)}
                            />
                            <label
                              className="edu-check-label"
                              htmlFor={`profession_${profession.id}`}
                            >
                              {profession.name}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Disclosure.Panel>
              </li>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <li>
                <Disclosure.Button
                  as="button"
                  className="py-2.5 px-4 flex flex-1 items-center select-none focus:outline-none focus:ring-0"
                >
                  Duración
                  {open ? (
                    <ChevronUpIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="ml-2 mr-auto h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel>
                  <ul className="pl-6 flex flex-col gap-2">
                    {duration.map((item, index) => {
                      return (
                        <li key={`dur_${index}`}>
                          <div className="course-sidebar-list">
                            <input
                              className="edu-check-box"
                              type="checkbox"
                              id={`dur_${item.id}`}
                              onChange={(event) => onChangeDuration(item)}
                            />
                            <label
                              className="edu-check-label"
                              htmlFor={`dur_${item.id}`}
                            >
                              {item.name}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Disclosure.Panel>
              </li>
            )}
          </Disclosure>
        </ul>
      )}
      {state.isAuthenticated ? (
        <ul className="flex flex-col py-6 px-2 space-y-1">
          {userNav.map((item, index) => _renderItem(item, index, false))}
        </ul>
      ) : (
        <ul className="flex flex-col py-6 px-2 space-y-1">
          <ButtonSecondary
            href={"/iniciar-sesion"}
            sizeClass="px-4 py-2 sm:px-5"
            className="border-solid border-1 border-neutral-200 text-neutral-500"
            bordered
          >
            Iniciar sesión
          </ButtonSecondary>
          <ButtonPrimary
            href={"/crear-cuenta"}
            sizeClass="px-4 py-2 sm:px-5"
            className="font-semibold"
          >
            Crear cuenta
          </ButtonPrimary>
        </ul>
      )}
    </div>
  );
};

export default NavMobile;
