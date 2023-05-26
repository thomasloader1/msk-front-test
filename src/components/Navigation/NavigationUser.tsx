import { Popover, Transition } from "@headlessui/react";
import Avatar from "components/Avatar/Avatar";
import { AuthContext } from "context/user/AuthContext";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

const NavigationUser = () => {
  const { state } = useContext(AuthContext);
  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {() => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <img
                src="/src/images/icons/profile.svg"
                alt=""
                className="ml-4 mt-2"
                width="25"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        containerClassName="dark:ring-0 shadow-2xl"
                        userName={state?.user?.name}
                        sizeClass="w-12 h-12"
                        radius="rounded-full"
                      />

                      <div className="flex-grow">
                        <h4 className="font-semibold">
                          {state?.user?.name || "-"}
                        </h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {state?.user?.profession || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* ------------------ 1 --------------------- */}
                    <Link
                      to={"/mi-perfil"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <img
                          src="/src/images/icons/profile.svg"
                          alt=""
                          width="20"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{"Mi Perfil"}</p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      to={"/mi-cuenta/inicio"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <img
                          src="/src/images/icons/config-account.svg"
                          alt=""
                          width="20"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {"Configurar mi cuenta"}
                        </p>
                      </div>
                    </Link>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      to={"/"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <img
                          src="/src/images/icons/logout.svg"
                          alt=""
                          width="20"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {"Cerrar Sesión"}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default NavigationUser;
