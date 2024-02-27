import { UserCourseProgress } from "data/types";
import { FC, useRef } from "react";
import ButtonAccessCourse from "./ButtonAccessCourse";
import {
  colorStatus,
  goToEnroll,
  statusCourse,
  statusOrdenVenta,
} from "logic/account";
import Badge from "components/Badge/Badge";
import InfoText from "components/InfoText/InfoText";
import CentroAyudaLink from "components/CentroAyudaLink/CentroAyudaLink";
import DateProductExpiration from "./DateProductExpiration";
import NcImage from "components/NcImage/NcImage";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import ButtonOffTrial from "./ButtonOffTrial";

interface DesktopCourseItemProps {
  item: UserCourseProgress;
  email: string;
  goToLMS: (
    product_code: number,
    cod_curso: string,
    email: string
  ) => Promise<void>;
}

const DesktopCourseItem: FC<DesktopCourseItemProps> = ({
  item,
  email,
  goToLMS,
}) => {
  const { isDisabled } = statusCourse(item.status);
  const statusOV = statusOrdenVenta(item.ov);
  const productExpiration = useRef(new Date(item.expiration));
  const productExpirationEnroll = useRef(new Date(item.limit_enroll));
  const trialName = item.ov.includes("suspendido") ? "Prueba suspendida" : "Prueba"

  return (
    <tr key={item.product_code}>
      <td className="px-6 py-4">
        <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
          <NcImage
            containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
            src={item.featured_image}
          />
          <div className="flex-wrap">
            <div className="ml-4 flex-grow">
              <span className="inline-flex line-clamp-2 font-normal  dark:text-neutral-300">
                {item.title || "-"}
              </span>
            </div>
            {item.ov !== "Baja" && item.ov !== "Trial suspendido" && (
              <>
                {item.expiration ? (
                  <DateProductExpiration
                    date={productExpiration.current}
                    text="Fecha de expiración"
                  />
                ) : (
                  <DateProductExpiration
                    date={productExpirationEnroll.current}
                    text="Fecha límite de activación"
                  />
                )}
              </>
            )}

            {(isDisabled && !item?.status?.includes("Listo para enrolar")) ||
              (statusOV.isDisabled && (
                <CentroAyudaLink addClassNames="mt-2 ml-3" />
              ))}

            {item?.status?.includes("Listo para enrolar") && (
              <InfoText
                addClassNames="mt-2 ml-3"
                text="¿No ves resultados? Intenta refrescar la pantalla."
              />
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 status-badge">
        
         {item.ov.includes("Trial") ? (
          <CategoryBadgeList 
            categories={[trialName]} 
            isTrial={item.ov.includes("Trial")} 
            />
            ) : (
            <Badge
              name={statusOV.isDisabled ? statusOV.hasText : item.status}
              color={colorStatus(
                statusOV.isDisabled ? statusOV.hasText : item.status
              )}
              textSize="text-sm"
            />
          )}
      </td>
      <td className="px-6 py-4  text-xs text-neutral-500 dark:text-neutral-400">
        <span className="text-sm"> {item.avance ? item.avance : 0} %</span>
      </td>
      <td className="px-4">
        <div>
        <ButtonAccessCourse
          email={email}
          goToEnroll={goToEnroll}
          goToLMS={goToLMS}
          item={item}
        />
         {item.ov.includes("Trial") && 
         <ButtonOffTrial 
            item={item} 
            email={email}
            
         />
         }
        </div>
      </td>
    </tr>
  );
};

export default DesktopCourseItem;
