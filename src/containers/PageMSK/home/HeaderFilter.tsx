import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { Link } from "react-router-dom";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: string;
  onClickTab: (item: string) => void;
  desc?: string;
  viewMore?: string;
  mobileHidden?: string;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  heading = "🎈 Latest Articles",
  onClickTab,
  desc = "",
  viewMore = "/tienda",
  mobileHidden = "hidden",
}) => {
  return (
    <div className="flex flex-col mb-8 relative">
      {desc.length || heading.length ? (
        <Heading desc={desc}>{heading}</Heading>
      ) : null}
      <div className="grid grid-cols-1">
        <Nav
          className="flex items-center gap-1 flex-wrap"
          containerClassName="relative text-sm md:text-base"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActive === item}
              onClick={() => onClickTab(item)}
            >
              {item}
            </NavItem>
          ))}
          <Link
            to={viewMore}
            className={`${mobileHidden} sm:block flex-shrink-0 my-auto header-see-more-btn`}
          >
            <ButtonSecondary
              className="!leading-none border-solid border-1 border-neutral-200 text-neutral-400 rounded-lg"
              sizeClass="px-3 py-2.5 sm:px-6"
            >
              <span className="text-[12px] leading-2">Ver más</span>
              <i className="ml-3 las la-arrow-right text-sm sm:text-xl"></i>
            </ButtonSecondary>
          </Link>
        </Nav>
      </div>
    </div>
  );
};

export default HeaderFilter;
