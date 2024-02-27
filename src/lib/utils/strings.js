export const removeTrailingSpaces = (value) => {
  return value.trim();
};

export const removeNewLinesAndTrailingSpaces = (value) => {
  return value.replace(/\n/g, '').trim();
};

export const formatNumberToCurrencyString = (value, numberOfFractionDigits) => {
  numberOfFractionDigits = numberOfFractionDigits ? numberOfFractionDigits : 0;

  const fractionString = Number(value).toLocaleString(
    process.env.REACT_APP_LOCALE,
    { maximumFractionDigits: numberOfFractionDigits, minimumFractionDigits: numberOfFractionDigits },
  );

  return `$${fractionString}`;
};

export const addPluralS = (value, count) => {
  return count > 1 ? `${value}s` : value;
};
