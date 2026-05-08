import numeral from "numeral";

export const parseNumber = (string: string) => {
  let newString = string;
  try {
    newString = newString.replace("+", "");
    newString = newString.replace(/\./g, "");
    return parseInt(newString);
  } catch (err) {
    return 0;
  }
};

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const formatNumber = (value?: number) =>
  value ? numeral(value).format("0,0") : 0;

export const stripTag = (value: string) =>
  value?.replace(/(<\S([^>]+)>)/gi, "");

export const safelyParseJson = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
};

export function formatToCurrencyVND(number: number | null | undefined): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number ?? 0); // Format as currency, default to 0 if no number is provided.
}
