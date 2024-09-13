import { Countries, Months } from "./constants";

export const cleanName = (name: string): string =>
  capitalizeFirstLetter(name.replaceAll("_", " "));

export const capitalizeFirstLetter = (text: string): string =>
  `${text.charAt(0).toUpperCase()}${text.substring(1)}`;

export const formatDate = (date: string): string => {
  const dateObject = new Date(date);

  return `${Months[dateObject.getMonth()]} (${dateObject.getFullYear()})`;
};

export const formatCountry = (countryCode: string): string =>
  Countries[countryCode] || countryCode;
