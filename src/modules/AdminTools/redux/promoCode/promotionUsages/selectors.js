import { createSelector } from 'reselect';

export const NAME = 'promotionUsages';

export const promotionUsagesSelector = createSelector(
  (state) => state[NAME],
  (promotionUsages) => promotionUsages.promotionUsages.promotionUsages,
);
