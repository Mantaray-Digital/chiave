export function formatPrice(
  amount: number,
  settings: { currencySymbol: string; currencyPosition: "before" | "after" }
): string {
  const formatted = amount.toFixed(2);
  return settings.currencyPosition === "before"
    ? `${settings.currencySymbol}${formatted}`
    : `${formatted}${settings.currencySymbol}`;
}
