export function add(a: number, b: number): number {
  return a + b;
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

export function addAndFormat(a: number, b: number, decimals = 2): string {
  const result = add(a, b);
  return formatNumber(result, decimals);
}