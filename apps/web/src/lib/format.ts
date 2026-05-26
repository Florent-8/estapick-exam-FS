export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);

export const formatType = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

