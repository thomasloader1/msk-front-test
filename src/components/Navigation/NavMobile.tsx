import React, { useContext } from "react";
import ButtonClose from "components/ButtonClose/ButtonClose";
import Logo from "components/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_MSK, NAVIGATION_USER } from "data/navigation";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ButtonSecondary from "components/Button/ButtonSecondary";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { AuthContext } from "context/user/AuthContext";

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
        <li className="text-neutral-900 dark:text-white">
          <div
            className={`flex justify-between font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isChild ? "" : "uppercase tracking-wide"
            }`}
          >
            <Disclosure.Button
              as="button"
              className="py-2.5 px-4 flex flex-1 justify-end select-none focus:outline-none focus:ring-0 uppercase"
            >
              {item.name}
              <ChevronDownIcon
                className="ml-auto h-4 w-4 text-neutral-500"
                aria-hidden="true"
              />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        </li>
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
          className={`flex w-full items-center py-2.5 px-4 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
            isChild ? "" : "uppercase tracking-wide"
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
  return (
    <div className="w-full h-full py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800 border-r border-transparent dark:border-neutral-700">
      <div className="py-6 px-5">
        <Logo />
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map((item, index) => _renderItem(item, index, false))}
      </ul>
      {state.isAuthenticated ? (
        <ul className="flex flex-col py-6 px-2 space-y-1">
          {userNav.map((item, index) => _renderItem(item, index, false))}
        </ul>
      ) : (
        <ul className="flex flex-col py-6 px-2 space-y-1">
          <ButtonSecondary
            href={"/login"}
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
