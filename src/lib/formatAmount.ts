export const formatAmount = (amount: number, currency: string): string => {
  try {
    const formattedAmount = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
    }).format(amount);

    // Agregar manualmente el símbolo de moneda y espacio delante del monto
    const customFormattedAmount = `${formattedAmount} ${currency}`;

    return customFormattedAmount;
  } catch (error: any) {
    console.error(`Error formatting currency: ${error.message}`);
    return `${currency} ${amount}`; // Devuelve el monto sin formato en caso de error
  }
};
