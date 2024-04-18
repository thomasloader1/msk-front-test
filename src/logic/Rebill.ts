import { sendToZoho } from "./Zoho";
import { ContactCRM, JsonMapping } from "@/data/types";
import { Dispatch, SetStateAction } from "react";
import rebillCountryPriceMapping from "@/data/jsons/__rebillCurrencyPrices.json"
import { getEnv } from "@/utils/getEnv";
import api from "@Services/api";
import ssr from "@Services/ssr";

declare global {
  interface Window {
    Rebill: any;
  }
}

let PROD = process.env.PROD;
let NEXT_PUBLIC_REBILL_URL = process.env.NEXT_PUBLIC_REBILL_URL;
let NEXT_PUBLIC_REBILL_API_KEY_TEST = process.env.NEXT_PUBLIC_REBILL_API_KEY_TEST;
let NEXT_PUBLIC_REBILL_API_KEY_PRD = process.env.NEXT_PUBLIC_REBILL_API_KEY_PRD;
let NEXT_PUBLIC_REBILL_ORG_ID_TEST = process.env.NEXT_PUBLIC_REBILL_ORG_ID_TEST;
let NEXT_PUBLIC_REBILL_ORG_ID_PRD = process.env.NEXT_PUBLIC_REBILL_ORG_ID_PRD;

//CL
let NEXT_PUBLIC_REBILL_CL_API_KEY_TEST = process.env.NEXT_PUBLIC_REBILL_CL_API_KEY_TEST;
let NEXT_PUBLIC_REBILL_CL_ORG_ID_TEST = process.env.NEXT_PUBLIC_REBILL_CL_ORG_ID_TEST;
let NEXT_PUBLIC_REBILL_CL_ORG_ID_PRD = process.env.NEXT_PUBLIC_REBILL_CL_ORG_ID_PRD;
let NEXT_PUBLIC_REBILL_CL_API_KEY_PRD = process.env.NEXT_PUBLIC_REBILL_CL_API_KEY_PRD;
let NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_TEST = process.env.NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_TEST;

const rebillCountriesPrices: JsonMapping = rebillCountryPriceMapping

export const REBILL_CONF = {
  ORG_ID: PROD ? NEXT_PUBLIC_REBILL_ORG_ID_PRD : NEXT_PUBLIC_REBILL_ORG_ID_TEST, //getEnv("REBILL_ORG_ID")
  API_KEY: PROD ? NEXT_PUBLIC_REBILL_API_KEY_PRD : NEXT_PUBLIC_REBILL_API_KEY_TEST, //getEnv("REBILL_API_KEY")
  URL: NEXT_PUBLIC_REBILL_URL,
  GATEWAYS: {
    ST: ["co", "uy", "cr","hn","ve","pe","ni","sv","bo", "py","gt","pa","ec"],
    MP: ["ar", "mx", "cl"],
    REBILL: ['cl','co','uy','mx']
  },
  PRICES: {
    NEXT_PUBLIC_REBILL_REBILL_CL_FREEMIUM_TEST,
}
};

export const getRebillInitialization = (country: string) => {
  console.log({country, PROD,NEXT_PUBLIC_REBILL_CL_ORG_ID_TEST,NEXT_PUBLIC_REBILL_CL_API_KEY_TEST})
  switch (country){
    case 'cl':
      return {
        organization_id: PROD ? NEXT_PUBLIC_REBILL_CL_ORG_ID_PRD : NEXT_PUBLIC_REBILL_CL_ORG_ID_TEST,
        api_key: PROD ? NEXT_PUBLIC_REBILL_CL_API_KEY_PRD : NEXT_PUBLIC_REBILL_CL_API_KEY_TEST,
        api_url: REBILL_CONF.URL,

      };
    default:
      return {
        organization_id: REBILL_CONF.ORG_ID,
        api_key: REBILL_CONF.API_KEY,
        api_url: REBILL_CONF.URL,
      };
  }

}

const mappingCheckoutFields = (contactZoho: ContactCRM) => {
  //console.log({contactZoho})

  return {
    firstName: contactZoho.First_Name,
    lastName: contactZoho.Last_Name,
    email: contactZoho.Email,
    phone: {
      countryCode: "54",
      areaCode: "11",
      phoneNumber: contactZoho.Phone,
    },
    birthday: contactZoho.Date_of_Birth ?? "99-99-9999",
    taxId: {
      type: "CUIT",
      value: "20" + contactZoho.Identificacion + "9",
    },
    personalId: {
      type: contactZoho.Tipo_de_Documento,
      value: contactZoho.Identificacion,
    },
    address: {
      street: contactZoho.Mailing_Street ?? contactZoho.Pais,
      number: "0",
      floor: "0",
      apt: "0",
      city: contactZoho.Mailing_City ?? contactZoho.Pais,
      state: contactZoho.Mailing_State ?? contactZoho.Pais,
      zipCode: contactZoho.Mailing_Zip ?? contactZoho.Pais,
      country: contactZoho.Pais,
      description: "Pago en el sitio de MSK",
    },
  };
};

const getPlan = (country: string) => {
  const gateway = REBILL_CONF.GATEWAYS.REBILL.includes(country) ? "REBILL" : null;
  const countryPrice = rebillCountriesPrices[country];
  const price = getEnv(`REBILL_${gateway}_${countryPrice}_FREEMIUM`);

  console.log({price, countryPrice})

  return {
    id: price,
    quantity: 1,
  };
};

export const initRebill = async (
  user: any,
  country: string,
  product: any,
  RebillSDKCheckout: any,
  setShow: Dispatch<SetStateAction<boolean>>,
  setFaliedMessage: Dispatch<SetStateAction<string>>,
  setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>,
  setMountedInput: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const contactZoho: ContactCRM = await ssr.getEmailByIdZohoCRM("Contacts", user.email);
    /*console.log({contactZoho, user})*/
    const customerRebill = mappingCheckoutFields(contactZoho);
   /* console.log({customerRebill})
    console.log({cardHolder:{
        name: contactZoho.Full_Name,
        identification: {
          type: contactZoho.Tipo_de_Documento,
          value: contactZoho.Identificacion,
        },
      }})*/
    //Seteo de customer
    RebillSDKCheckout.setCustomer(customerRebill);

    //Seteo de identidicacion del customer
    RebillSDKCheckout.setCardHolder({
      name: contactZoho.Full_Name,
      identification: {
        type: contactZoho.Tipo_de_Documento,
        value: contactZoho.Identificacion,
      },
    });

    //Seteo de plan para cobrar
    const { id, quantity } = getPlan(country);
   /* console.log({
      transaction: {
        prices: [
          {
            id,
            quantity,
          },
        ],
      }
    });*/
    RebillSDKCheckout.setTransaction({
      prices: [
        {
          id,
          quantity,
        },
      ],
    }).then((price_setting: any) => console.log({ price_setting }));

    //Seteo de callbacks en saco de que el pago este correcto o tengo algun fallo
    RebillSDKCheckout.setCallbacks({
      onSuccess: (response: any) => {
        console.log("Rebill success callback")
        sendToZoho(response, contactZoho, country, product, setShow, setPaymentCorrect, setFaliedMessage)
      },
      onError: (error: any) => {
         console.error({ callbackRebillError: error })
        },
    });

    //Seteo metadata de la suscripcio
    RebillSDKCheckout.setMetadata({
      contact_id: "x" + contactZoho.id,
    });

    //Textos de validaciones con el elemento de la tarjeta
    RebillSDKCheckout.setText({
      card_number: "Numero de tarjeta",
      pay_button: "Finalizar",
      error_messages: {
        emptyCardNumber: "Ingresa el numero de la tarjeta",
        invalidCardNumber: "El numero de la tarjeta es invalido",
        emptyExpiryDate: "Enter an expiry date",
        monthOutOfRange: "Expiry month must be between 01 and 12",
        yearOutOfRange: "Expiry year cannot be in the past",
        dateOutOfRange: "Expiry date cannot be in the past",
        invalidExpiryDate: "Expiry date is invalid",
        emptyCVC: "Ingresar CVC",
        invalidCVC: "CVC es invalido",
      },
    });

    RebillSDKCheckout.setStyles({
      fieldWrapper: {
        base: {
          maxWidth: "auto",
          height: "auto",
        },
        errored: {},
      },
      inputWrapper: {
        base: {
          maxWidth: "auto",
          fontFamily: '"Inter"',
          borderColor: "#E4E4E4",
        },
      },
      errorText: {
        base: {},
      },
      button: {
        base: {
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: "14px",
        },
      },
    });

    //Aplicar configuracion al DOM
    RebillSDKCheckout.setElements("rebill_elements");
    setMountedInput(true)
  } catch (e: any) {
    console.error({ e })
  }
};
