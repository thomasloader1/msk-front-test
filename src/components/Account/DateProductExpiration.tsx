import { formatDate } from "@/lib/formatDate";
import { FC } from "react";
import NcImage from "../NcImage/NcImage";

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
        <div className="flex items-center mt-2">
          <NcImage
            src={"/images/icons/calendar.svg"}
            alt="Calendar Icon"
            className="mr-2"
            width="16"
            height="16"
          />
          <span className="text-violet-wash text-[10px] sm:text-sm">
            {text}: {formatDate(date)}
          </span>
        </div>
      )}
    </>
  );
};

export default DateProductExpiration;
