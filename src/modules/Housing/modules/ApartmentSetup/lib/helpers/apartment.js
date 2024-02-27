import { apartmentConstants } from '@/modules/Housing/lib';
import { formatCurrencyStringToNumber } from '@/lib/utils';
import { apartmentKeyMap } from '../configs';

const {
  UNIT_HAS_COUCH_NAME,
  FURNITURE_MONTHLY_COST_NAME,
  EXPECTED_RENT_NAME,
  FURNITURE_PHONE_NAME,
  UTILITIES_IS_ADDED_TO_REP_NAME,
} = apartmentConstants;

function mapApartmentData(data) {
  const result = {};

  for (const key in apartmentKeyMap) {
    if (data.hasOwnProperty(key)) {
      const propertyPath = apartmentKeyMap[key];
      let target = result;

      for (let i = 0; i < propertyPath.length - 1; i++) {
        const part = propertyPath[i];

        if (!target[part]) {
          target[part] = {};
        }

        target = target[part];
      }

      target[propertyPath[propertyPath.length - 1]] = data[key];
    }
  }

  return result;
}

export const combineApartmentData = (data) => {
  const newData = {};

  const currencyFields = [
    FURNITURE_MONTHLY_COST_NAME,
    EXPECTED_RENT_NAME,
  ];

  const phoneFields = [
    FURNITURE_PHONE_NAME,
  ];

  const yesNoFields = [
    UNIT_HAS_COUCH_NAME,
    UTILITIES_IS_ADDED_TO_REP_NAME,
  ];

  Object.entries(data).forEach(([key, value]) => {
    switch (true) {
      case value?.length === 0 || value === null || value === undefined:
        break;
      case currencyFields.includes(key):
        newData[key] = formatCurrencyStringToNumber(value);
        break;
      case phoneFields.includes(key):
        newData[key] = value.replace(/[^0-9]/g, '');
        break;
      case yesNoFields.includes(key):
        newData[key] = value === 'Yes';
        break;
      default:
        newData[key] = value;
    }
  });

  return mapApartmentData(newData);
};
