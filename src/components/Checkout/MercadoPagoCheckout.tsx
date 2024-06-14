import React, {Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import {CardNumber, createCardToken, ExpirationDate, initMercadoPago, SecurityCode} from "@mercadopago/sdk-react";
import {getMPPublicKeyFromCountry} from "@/logic/MercadoPago";
import cardIcon from '/public/images/credit-card.svg'
import {AuthContext} from "@/context/user/AuthContext";
import Image from 'next/image'
import {FetchSingleProduct} from "@/data/types";
import InputSkeleton from "@/components/Skeleton/InputSkeleton";

interface MercadoPagoCheckoutProps{
    product: FetchSingleProduct | undefined;
    hasCoursedRequested: boolean;
    country: string;
    showMissingData: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    setFaliedMessage: Dispatch<SetStateAction<string>>;
    setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>;
    mountedInputObjectState: {
        state: boolean;
        setState: Dispatch<SetStateAction<boolean>>
    }
}

const MercadoPagoCheckout: FC<MercadoPagoCheckoutProps> = ({ product,country,mountedInputObjectState }) => {
    const { state: AuthState } = useContext(AuthContext);

    const documentNumber = AuthState?.profile?.identification
    const [onPaymentRequest, setOnPaymentRequest] = useState(false);
    console.log({AuthState})

    let mpKey = getMPPublicKeyFromCountry(country);
    console.log({mpKey})
    initMercadoPago(mpKey);

    if(typeof mpKey !== "undefined" && mpKey !== "" && product?.ficha){
        mountedInputObjectState.setState(true);
    }

    const cardToken = async () => {
        const response = await createCardToken({
            cardholderName: 'APRO',
            identificationType: 'DNI',
            identificationNumber: documentNumber,
        });
        console.log('Card Token Response = ', response);
        return response?.id;
    };

    const handlePayment = async () => {
        setOnPaymentRequest(true);
        let token = await cardToken();
        try {
            const paymentResponse = await fetch('/api/gateway/api/mercadopago/payment/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer $2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6`
                },
                body: JSON.stringify({
                    token,
                    transaction_amount: invoice.advancePayment.info.quoteForMonth,
                    description: `Pago de contrato (SO: ${invoice.checkoutPayment.contract_so})`,
                    installments: quotes,
                    payment_method_id: 'visa',
                    paymentDetails: invoice.checkoutPayment
                })
            });

            const paymentResult = await paymentResponse.json();

            if(paymentResult.error){

                let templateMessage = `
                                                ${paymentResult.full_error.message} <br/>
                                                ${paymentResult?.full_error?.code ? `code: ${paymentResult?.full_error?.code}` : ''} 
                                             `;

                fireModalAlert('Error de pago',templateMessage, 'error');
            }else{
                fireModalAlert("Pago realizado con éxito",'' ,"success",{redirect: true});
            }

            console.log('Payment Result: ', paymentResult);
        } catch (error) {
            console.error('Error processing payment: ', {error});
            if(error.status === 504){
                fireModalAlert('Error al procesar el pago', 'El servidor no logro procesar el pago correctamente, intentelo nuevamente', 'error');
            }
        }finally {
            setOnPaymentRequest(false);
        }
    }

    return(
        <>
            {mountedInputObjectState.state ? <div className="mpc-box">
                <div className={`mpc-field ${onPaymentRequest ? 'mpc-field-requesting hidden' : null}`}>
                    <Image src={cardIcon} alt="Mercado Pago" className="mr-3"></Image>
                    <CardNumber
                        placeholder='1234 5678 9123 4567'
                    />
                    <ExpirationDate
                        placeholder='01/01'
                        mode='short'
                    />
                    <SecurityCode
                        placeholder='333'
                    />
                </div>

                <button
                    className="mpc-button"
                    onClick={() => handlePayment()}
                    disabled={onPaymentRequest}
                >
                    {onPaymentRequest ? 'Procesando ...' : 'Finalizar'}
                </button>
            </div> : <InputSkeleton className="w-[390px] mx-auto"/>}
        </>
    )

}

export default MercadoPagoCheckout;