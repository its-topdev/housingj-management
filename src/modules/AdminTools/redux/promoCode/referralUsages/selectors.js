import { createSelector } from 'reselect';

export const NAME = 'referralUsages';

export const referralUsagesSelector = createSelector(
  (state) => state[NAME],
  (referralUsages) => referralUsages.referralUsages.referralUsages,
);
