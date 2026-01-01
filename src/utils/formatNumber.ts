export function formatNumberDE(
  value: number | string | null | undefined,
  options?: Intl.NumberFormatOptions,
): string {
  if (value === null || value === undefined || value === '') return '';
  const num = typeof value === 'string' ? Number(value) : value;

  if (typeof num !== 'number' || !isFinite(num)) {
    return String(value as any);
  }

  const formatter = new Intl.NumberFormat('de-DE', options);
  return formatter.format(num);
}

export default formatNumberDE;
