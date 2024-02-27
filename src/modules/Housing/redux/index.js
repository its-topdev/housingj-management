import { apartmentReducer, apartmentWatcher } from './apartment';
import { areaReducer, areaWatcher } from './area';
import { ledgerActionWatcher, ledgerReducer } from './ledger';
import { partnershipReducer, partnershipWatcher } from './partnership';

export const housingReducers = {
  housingArea: areaReducer,
  apartment: apartmentReducer,
  partnership: partnershipReducer,
  ledger: ledgerReducer,
};

export const housingSagas = [
  apartmentWatcher(),
  areaWatcher(),
  partnershipWatcher(),
  ledgerActionWatcher(),
];
