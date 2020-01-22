export const truncDecimals = (input: number, decimals: number = 0): string => {
  // Take twice the amount of the decimals to show to avoid rounding as much as possible
  const decimalsMatches = input.toFixed(decimals * 2).match(`^-?\\d+(?:\\.\\d{0,${decimals}})?`);
  return decimalsMatches?.length && decimalsMatches[0] ? decimalsMatches[0] : '';
};
