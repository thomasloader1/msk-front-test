import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonDropdown from "components/ButtonDropdown/ButtonDropdown";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import React, { FC, useState } from "react";

interface Props {
  onSearch: (searchTerm: string) => void;
  onFilter: (selectedOption: string) => void;
  length: number;
  filtersCount: number;
}

const filterItems = [
  { name: "Novedades", value: "novedades" },
  // { name: "Favoritos", value: "favoritos" },
  { name: "Más horas", value: "mas_horas" },
  { name: "Menos horas", value: "menos_horas" },
];
const StoreBar: FC<Props> = ({ onSearch, onFilter, length, filtersCount }) => {
  const [selectedOption, setSelectedOption] = useState("Novedades");

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleSelectOption = (event: { name: string; value: string }) => {
    setSelectedOption(event.name);
    onFilter(event.value);
  };
  return (
    <div className=" course-bar-up-area">
      <div className="container">
        <div className="grid grid-cols-1">
          <div className="course-main-wrapper mb-30">
            <div className="bar-filter">
              <i className="flaticon-filter"></i>
              <span>Filtros</span>
              <span>({filtersCount})</span>
            </div>
            <div className="corse-bar-wrapper">
              <div className="bar-search">
                <form action="#">
                  <div className="bar-search-icon position-relative">
                    <i className="flaticon-search"></i>
                    <input
                      type="text"
                      placeholder="Buscar"
                      onChange={handleSearchInput}
                    />
                    <button type="submit">
                      <i className="far fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="course-sidebar-tab">
              <div className="course-sidebar-wrapper">
                <div className="curse-tab-left-wrap">
                  <div className="course-results">
                    Mostrando{" "}
                    <span className="course-result-showing">
                      {length > 18 ? 18 : length}
                    </span>{" "}
                    de <span className="course-result-number">{length}</span>{" "}
                    resultados
                  </div>
                </div>
                <Listbox
                  value={"selectedOption"}
                  onChange={(e: any) => handleSelectOption(e)}
                >
                  <div className="relative md:min-w-[200px] store-filter-dropdown">
                    <Listbox.Button as={"div"}>
                      <ButtonDropdown>{selectedOption}</ButtonDropdown>
                    </Listbox.Button>
                    <Listbox.Options className="absolute right-0 w-52 py-1 mt-2 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700 z-50">
                      {filterItems.map(
                        (item: ListBoxItemType, index: number) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `${
                                active
                                  ? "text-primary-700 dark:text-neutral-200 bg-primary-50 dark:bg-neutral-700"
                                  : ""
                              } cursor-default select-none relative py-2 pl-10 pr-4`
                            }
                            value={item}
                          >
                            {() => (
                              <>
                                <span
                                  className={`${
                                    selectedOption == item.name
                                      ? "font-medium"
                                      : "font-normal"
                                  } block truncate`}
                                >
                                  {item.name}
                                </span>
                                {selectedOption == item.name ? (
                                  <span className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        )
                      )}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBar;
