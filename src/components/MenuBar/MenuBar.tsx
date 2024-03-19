import React, { useState, Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import NavMobile from "components/Navigation/NavMobile";
import { useLocation } from "react-router-dom";

export interface MenuBarProps {}
const MenuBar: React.FC<MenuBarProps> = () => {
  const [isVisable, setIsVisable] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisable(false);
  }, [location.pathname]);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const renderContent = () => {
    return (
      <Transition show={isVisable} as={Fragment}>
        <div className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter=" duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-neutral-900 bg-opacity-50 "
              onClick={handleCloseMenu}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition duration-100 transform"
            enterFrom="opacity-0 -translate-x-14"
            enterTo="opacity-100 translate-x-0"
            leave="transition duration-150 transform"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-14"
          >
            <div className="fixed inset-y-0 left-0 w-screen max-w-sm overflow-y-auto z-50">
              <div className="flex min-h-full min-w-full">
                <div className="w-full h-full fixed overflow-hidden transition-all">
                  <NavMobile onClickClose={handleCloseMenu} />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsVisable(!isVisable);
        }}
        className="p-0 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
      >
        <svg
          width="28"
          height="22"
          viewBox="0 0 28 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 0.5C1.17158 0.5 0.5 1.17158 0.5 2C0.5 2.82842 1.17158 3.5 2 3.5H26C26.8284 3.5 27.5 2.82842 27.5 2C27.5 1.17158 26.8284 0.5 26 0.5H2ZM0.5 11C0.5 10.1715 1.17158 9.5 2 9.5H26C26.8284 9.5 27.5 10.1715 27.5 11C27.5 11.8285 26.8284 12.5 26 12.5H2C1.17158 12.5 0.5 11.8285 0.5 11ZM0.5 20C0.5 19.1716 1.17158 18.5 2 18.5H26C26.8284 18.5 27.5 19.1716 27.5 20C27.5 20.8284 26.8284 21.5 26 21.5H2C1.17158 21.5 0.5 20.8284 0.5 20Z"
            fill="#9CA3AF"
          />
        </svg>
      </button>

      {renderContent()}
    </div>
  );
};

export default MenuBar;
