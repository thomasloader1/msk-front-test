import React, { FC } from "react";
import doctors_1 from "images/vectors/doctors_1.png";
import NcImage from "components/NcImage/NcImage";
import Badge from "components/Badge/Badge";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";

export interface NewsletterProps {
  className?: string;
}

const Newsletter: FC<NewsletterProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-Newsletter relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="Newsletter"
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Disfruta nuestros contenidos</h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Suscríbete al newsletter y accede con anticipación a materiales
          académicos 100% sin costo.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" className="rounded-xl" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Guías profesionales
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge name="02" className="rounded-xl" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Webinars
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge name="03" className="rounded-xl" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Podcasts
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
            className="rounded-lg w-full"
          />
          <ButtonPrimary
            type="submit"
            className="absolute transform -translate-y-10 -translate-x-14 left-full h-9 w-12"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonPrimary>
        </form>
      </div>
      <div className="flex-grow ">
        <div className="newsletter-doctors">
          <NcImage src={doctors_1} />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
