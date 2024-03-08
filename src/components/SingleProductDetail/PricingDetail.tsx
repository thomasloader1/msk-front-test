import { JsonInstallmentsMapping, JsonMapping } from 'data/types';
import { formatAmount } from 'lib/formatAmount'
import { FC, useContext } from 'react'
import currencyMapping from "../../data/jsons/__countryCurrencies.json"
import installmentsMapping from "../../data/jsons/__countryInstallments.json"
import { CountryContext } from 'context/country/CountryContext';

interface PricingDetailProps {
    isEbook: boolean | undefined;
    product: any;
}

const PricingDetail: FC<PricingDetailProps> = ({ isEbook, product }) => {

    if (isEbook) return null

    const {state:countryState} = useContext(CountryContext);
    const currencyJSON: JsonMapping = currencyMapping;
    const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;
    const installments = installmentsJSON[countryState.country].quotes;
    
    if(installments != null){
        const currency = currencyJSON[countryState.country];
        const totalProductPrice = Number(product.total_price.replaceAll(".", ""));
        const [installmentProductPrice, cents] = (totalProductPrice / installments).toFixed(2).split(".")
    
        return (
            <div className="mb-2">
                <div className="text-sm mb-4 text-violet-strong">Total: <strong>{formatAmount(totalProductPrice, currency)}</strong></div>
                <div className="text-sm mb-2 text-violet-strong">{installments} pagos de:</div>
                <span className="text-[32px] font-bold text-violet-dark">{formatAmount(Number(installmentProductPrice), currency)}</span>
            </div>
        )
    }else{
        return (
            <div className="mb-2">
                 <span>💳 Pagos sin intereses</span> 
            </div>
        )   
    }
    
    
}

export default PricingDetail