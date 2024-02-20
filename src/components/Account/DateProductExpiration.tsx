import { formatDate } from "lib/formatDate";
import calendarIcon from "/images/icons/calendar.svg";
import { FC } from "react";

interface DateProductExpirationProps {
  date: Date;
  text: string;
}

const DateProductExpiration: FC<DateProductExpirationProps> = ({
  date,
  text,
}) => {
  return (
    <>
      {formatDate(date) && (
        <div className="flex items-center mt-2 ml-3">
          <img src={calendarIcon} alt="Calendar Icon" className="mr-2" />
          <span className="text-violet-wash text-[14px] sm:text-sm">
            {text}: {formatDate(date)}
          </span>
        </div>
      )}
    </>
  );
};

export default DateProductExpiration;
