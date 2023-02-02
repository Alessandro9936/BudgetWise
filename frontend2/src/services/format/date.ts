export const formatYear = (date: Date) =>
  new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
  }).format(date);

export const formatMonth = (date: Date) =>
  new Intl.DateTimeFormat(navigator.language, {
    month: "long",
    year: "numeric",
  }).format(date);
