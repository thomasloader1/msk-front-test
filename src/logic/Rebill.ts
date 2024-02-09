import { sendToZoho } from "./Zoho";

const REBILL_CONF = {
  ORG_ID: "",
  API_KEY: "",
  URL: "",
};

const mappingCheckoutFields = (user) => {
  return {
    firstName: contact.First_Name,
    lastName: contact.Last_Name,
    email: paymentLinkCustomer.email,
    phone: {
      countryCode: countryCallingCode,
      areaCode: "11",
      phoneNumber: nationalNumber,
    },
    birthday: contact.Date_of_Birth,
    taxId: {
      type: "CUIT",
      value: "20" + paymentLinkCustomer.personalId + "9",
    },
    personalId: {
      type,
      value: paymentLinkCustomer.personalId,
    },
    address: {
      street: street.join(" "),
      number: number,
      floor: "0",
      apt: "0",
      city: checkout.country,
      state: checkout.country,
      zipCode: paymentLinkCustomer.zip,
      country: checkout.country,
      description: "Pago en el sitio de MSK",
    },
  };
};

const getPlanPriceCheckout = () => {
  return {
    id: isStripe
      ? PRICES.STRIPE[countryPayment]["FREEMIUM"]
      : PRICES.MP[countryPayment]["FREEMIUM"],
    quantity: 1,
  };
};

export const initRebill = (user, product) => {
  const initialization = {
    organization_id: REBILL_CONF.ORG_ID,
    api_key: REBILL_CONF.API_KEY,
    api_url: REBILL_CONF.URL,
  };

  const RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

  const customerRebill = mappingCheckoutFields(user);
  //console.log({ customerRebill })
  //Seteo de customer
  RebillSDKCheckout.setCustomer(customerRebill);

  //Seteo de identidicacion del customer
  RebillSDKCheckout.setCardHolder({
    name: contact.Full_Name,
    identification: {
      type,
      value: paymentLinkCustomer.personalId,
    },
  });

  //Seteo de plan para cobrar

  const { id, quantity } = getPlanPriceCheckout(formValues, sale);
  console.log({ id, quantity });
  RebillSDKCheckout.setTransaction({
    prices: [
      {
        id,
        quantity,
      },
    ],
  }).then((price_setting) => console.log({ price_setting }));

  //Seteo de callbacks en saco de que el pago este correcto o tengo algun fallo
  const { UPDATE_CONTRACT, MP } = URLS;

  RebillSDKCheckout.setCallbacks({
    onSuccess: (response) => sendToZoho(response),
    onError: (error) => {
      console.error(error);
      fireModalAlert("Pago Fallido", error);
    },
  });

  //Seteo metadata de la suscripcio
  RebillSDKCheckout.setMetadata({
    so_number: "x" + sale.SO_Number,
  });

  //Textos de validaciones con el elemento de la tarjeta
  RebillSDKCheckout.setText({
    card_number: "Numero de tarjeta",
    pay_button: "Pagar",
    error_messages: {
      emptyCardNumber: "Ingresa el numero de la tarjeta",
      invalidCardNumber: "El numero de la tarjeta es invalido",
      emptyExpiryDate: "Enter an expiry date",
      monthOutOfRange: "Expiry month must be between 01 and 12",
      yearOutOfRange: "Expiry year cannot be in the past",
      dateOutOfRange: "Expiry date cannot be in the past",
      invalidExpiryDate: "Expiry date is invalid",
      emptyCVC: "Enter a CVC",
      invalidCVC: "CVC is invalid",
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
      },
    },
    errorText: {
      base: {},
    },
    button: {
      backgroundColor: "#E5E7EB;",
      borderRadius: "4px",
      color: "#374161",
    },
  });

  //Aplicar configuracion al DOM
  RebillSDKCheckout.setElements("rebill_elements");
};
