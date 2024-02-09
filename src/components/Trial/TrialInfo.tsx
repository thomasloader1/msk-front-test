import React, { FC } from "react";
import currencyMapping from "../../data/jsons/__countryCurrencies.json";
import installmentsMapping from "../../data/jsons/__countryInstallments.json";
import { formatAmount } from "lib/formatAmount";
import {
  FetchSingleProduct,
  JsonInstallmentsMapping,
  JsonMapping,
} from "data/types";
import { useParams } from "react-router-dom";
import useSingleProduct from "hooks/useSingleProduct";

interface TrialInfoProps {
  country: string;
}

const currencyJSON: JsonMapping = currencyMapping;
const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const TrialInfo: FC<TrialInfoProps> = ({ country }) => {
  const { slug }: { slug: string } = useParams();

  const { product, loading } = useSingleProduct(slug, {
    country: country,
  });

  const currency = currencyJSON[country];
  const installments = installmentsJSON[country].quotes;

  const totalAmount: number | undefined = parseFloat(
    product?.total_price?.replace(/\./g, "").replace(",", ".") || "0"
  );

  const installmentAmount = totalAmount / installments;

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
            {formatAmount(installmentAmount, currency)}
          </p>
        </div>
      </div>

      <div className="border-t border-dashed border-[#e4e4e4] my-4"></div>

      <div className="flex flex-col xl:flex-row justify-between px-4 pb-3">
        <div className="mb-3 xl:mb-0">
          <p className="text-violet-wash">
            Detalle de tu inscripción al finalizar el período de prueba 
          </p>
          <p className="text-violet-strong">
            x1{" "}
            <span className="font-bold text-violet-strong">
              {product?.ficha?.title}
            </span>
          </p>
        </div>
        <div>
          <p className="text-violet-wash">Total</p>
          <p className="text-violet-strong font-bold">
            {formatAmount(totalAmount, currency)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrialInfo;
