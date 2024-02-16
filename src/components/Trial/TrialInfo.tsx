import { Dispatch, FC, SetStateAction } from "react";
import currencyMapping from "../../data/jsons/__countryCurrencies.json";
import installmentsMapping from "../../data/jsons/__countryInstallments.json";
import { formatAmount } from "lib/formatAmount";
import {
  JsonInstallmentsMapping,
  JsonMapping,
} from "data/types";
import TextSkeleton from "components/Skeleton/TextSkeleton";

interface TrialInfoProps {
  country: string;
  product: any;
  mountedInputState: { 
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
}

const currencyJSON: JsonMapping = currencyMapping;
const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const TrialInfo: FC<TrialInfoProps> = ({ country, product, mountedInputState }) => {
  const currency = currencyJSON[country];
  const installments = installmentsJSON[country].quotes;

  const totalAmount: number = parseFloat(
    product?.total_price ? product.total_price.replace(/\./g, "").replace(",", ".") : 0
  );

  const installmentAmount = (totalAmount) / installments;

  product.totalAmount = totalAmount 
  product.installmentAmount = installmentAmount

  const {state: mountedInput } = mountedInputState

  return (
    <section className="bg-white rounded-lg drop-shadow-2xl shadow-gray-100 mb-8 text-violet-strong">
      <div className="px-4 pt-3">
        <h2 className="text-4xl font-bold mb-3">
          Finaliza tu inscripción de prueba 
        </h2>
        <p className="mb-3 text-violet-wash">
          ¡Prepárate para la experiencia MSK! Con tu{" "}
          <strong>prueba de 7 días gratis</strong> podrás disfrutar de los
          contenidos principales del curso elegido. Accede a ellos iniciando
          sesión, dentro de tu perfil personal, donde también podrás cancelar el
          período de prueba sin costo. 
        </p>
        <p className="text-violet-wash">
          A partir del octavo día, se confirmará tu inscripción al curso
          completo y abonarás la misma de la siguiente manera. 
        </p>

        <div className="my-5 border p-3 rounded-lg max-w-[350px]">
          <p className="text-violet-strong">Primer pago de</p>
          <h4 className="text-3xl mb-3">{formatAmount(0, currency)}</h4>
          <p className="text-violet-wash">
            {installments} pagos restantes de{" "}
            {!mountedInput ? <TextSkeleton /> : formatAmount(installmentAmount, currency)}
          </p>
        </div>
      </div>

      <div className="border-t border-dashed border-[#e4e4e4] my-4"></div>

      <div className="flex flex-col xl:flex-row justify-between px-4 pb-3">
        <div className="mb-3 xl:mb-0">
          <p className="text-violet-wash">
            Detalle de tu inscripción al finalizar el período de prueba 
          </p>
          {!mountedInput ? <TextSkeleton /> : <p className="text-violet-strong">
            x1{" "}
            <span className="font-bold text-violet-strong">
              {product?.title}
            </span>
          </p>}
        </div>
        <div>
          <p className="text-violet-wash">Total</p>
          <p className="text-violet-strong font-bold">
          {!mountedInput ? <TextSkeleton className="w-full max-w-[100px]" /> : formatAmount(totalAmount, currency)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrialInfo;
