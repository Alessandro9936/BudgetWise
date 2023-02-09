export const formatMonth = (date: Date) =>
  new Intl.DateTimeFormat(navigator.language, {
    month: "long",
    year: "numeric",
  }).format(date);

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat(navigator.language, { dateStyle: "long" }).format(
    date
  );
