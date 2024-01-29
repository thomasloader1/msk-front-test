import { formatDate } from "lib/formatDate";
import calendarIcon from "../../images/icons/calendar.svg";
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
    <div className="flex items-center mt-2 ml-1 md:ml-4">
      <img src={calendarIcon} alt="Calendar Icon" className="mr-2" />
      <span className="text-violet-wash text-[10px] sm:text-sm">
        {text}: {formatDate(date)}
      </span>
    </div>
  );
};

export default DateProductExpiration;
