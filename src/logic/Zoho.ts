import api from "Services/api";

export const sendToZoho = (response: any) => {
  /*  const { invoice, failedTransaction, pendingTransaction } = response;

  if (failedTransaction != null) {
    const { payment } = failedTransaction.paidBags[0];
    const { errorMessage } = payment;
    handleSetContractStatus(payment, checkout.contract_entity_id);
    fireModalAlert("Error de pago", errorMessage, "error");
    return;
  }

  if (pendingTransaction !== null) {
    const { payment } = pendingTransaction.paidBags[0];
    const { customer } = pendingTransaction.buyer;
    const dni =
      customer.personalIdNumber !== ""
        ? customer.personalIdNumber
        : contact.DNI;

    const paymentData = { checkout, customer, sale, payment, dni };

    axios
      .post(URLS.PENDING_PAYMENT, {
        ...payment,
        type: checkout.type,
        contract_id: so,
        paymentData: JSON.stringify(paymentData),
      })
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
    handleSetContractStatus(payment, checkout.contract_entity_id);

    fireModalAlertRedirect(
      "Pago pendiente",
      "El pago se esta aun procesando, aguarde a la notificacion de email",
      payment
    );
    return;
  }

  fireModalAlert("Pago Realizado", "", "success", 5000);
  //fireAlert('Pago Realizado', 'asdasd', 'success', 5000);

  const { paidBags, buyer } = invoice;
  const { payment, schedules } = paidBags[0];
  const { customer } = buyer;
  const [subscriptionId] = schedules;
  //console.log("subscriptionId: ",subscriptionId);
  const QUOTES = checkout.quotes ? Number(checkout.quotes) : 1;

  const isAdvanceSuscription = checkout.type.includes(
    "Suscripción con anticipo"
  );
  const advanceSuscription = valuesAdvanceSuscription({
    total: contractData.sale?.Grand_Total,
    checkoutPayment: checkout,
  });

  const dataForZoho = {
    isAdvanceSuscription,
    advanceSuscription,
    QUOTES,
    customer,
    payment,
    paymentLinkCustomer,
    checkout,
    sale,
    subscriptionId,
    trial: Boolean(checkout.trial),
  };

  const postUpdateZoho = makePostUpdateZohoCheckout(dataForZoho);

  //console.log("advanceSuscription",advanceSuscription);
  if (advanceSuscription.isAdvanceSuscription) {
    handleSuscriptionUpdateCheckout(
      postUpdateZoho.subscriptionId,
      advanceSuscription
    );
  }

  const URL = checkout.gateway.includes("Stripe") ? UPDATE_CONTRACT : MP;

  api.updateContactZoho(); */
};
