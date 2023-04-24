import React from "react";
import ButtonClose from "components/ButtonClose/ButtonClose";
import Logo from "components/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_MSK } from "data/navigation";
import { ChevronDownIcon } from "@heroicons/react/solid";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_MSK,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-5 pb-1 text-base">
        {item.children?.map((item, index) => _renderItem(item, index, true))}
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
            <NavLink
              exact
              strict
              className="py-2.5 px-4 select-none"
              to={{
                pathname: item.href || undefined,
              }}
              activeClassName="text-secondary"
            >
              {item.name}
            </NavLink>

            <Disclosure.Button
              as="button"
              className="py-2.5 px-4 flex flex-1 justify-end select-none focus:outline-none focus:ring-0"
            >
              <ChevronDownIcon
                className="ml-2 h-4 w-4 text-neutral-500"
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
    </div>
  );
};

export default NavMobile;
