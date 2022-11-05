export function currencyFormatter(value: string, currency: string) {
  return Number(value).toLocaleString('pt-br', {
    currency,
    minimumFractionDigits: 6,
  });
}
