import { createSelector } from 'reselect';

const ledgerObjectSelector = (state) => state.ledger;

export const ledgerTotalSelector = createSelector(
  ledgerObjectSelector,
  (state) => state?.ledgerTotal,
);

export const ledgerListSelector = createSelector(
  ledgerObjectSelector,
  (state) => state?.ledgerList,
);

export const ledgerSelector = createSelector(
  ledgerObjectSelector,
  (state) => state?.ledger,
);

export const ledgerHistorySelector = createSelector(
  ledgerObjectSelector,
  (state) => state?.history,
);
