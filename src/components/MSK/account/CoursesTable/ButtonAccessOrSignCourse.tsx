import { FC, useState } from "react";
import ButtonAccessCourse from "./ButtonAccessCourse";
import { UserCourseProgress } from "@/data/types";
import { statusOrdenVenta } from "@/lib/account";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { useRouter } from "next/navigation";

interface ButtonAccessOrSignCourseProps {
  email: string;
  goToEnroll: (product_code: number, email: string) => Promise<any>;
  goToLMS: (
    product_code: number,
    cod_curso: string,
    email: string
  ) => Promise<void>;
  item: UserCourseProgress;
}

const ButtonAccessOrSignCourse: FC<ButtonAccessOrSignCourseProps> = ({
  email,
  goToEnroll,
  goToLMS,
  item,
}) => {
  const statusOV = statusOrdenVenta(item?.ov);

  const [isDisabled, setIsDisabled] = useState(statusOV.isDisabled);
  const router = useRouter();
  return (
    <>
      {isDisabled ? (
        <ButtonPrimary
          onClick={() => router.push(`/curso/${item.slug}`)}
          sizeClass="py-0.5 sm:py-1 px-2 sm:px-5"
        >
          <span className="text-[14px] sm:text-sm font-bold">Inscríbete</span>
        </ButtonPrimary>
      ) : (
        <ButtonAccessCourse
          email={email}
          goToEnroll={goToEnroll}
          goToLMS={goToLMS}
          item={item}
        />
      )}
    </>
  );
};

export default ButtonAccessOrSignCourse;
