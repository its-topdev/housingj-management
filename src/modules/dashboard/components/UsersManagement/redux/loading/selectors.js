import { createSelector } from 'reselect';

const loadingSelector = (state) => state.loading;

export const isArchivedLeadsLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.archivedLeads?.isLoading || state?.deleteLeadEmail?.isLoading,
);

export const deleteLeadEmailLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.deleteLeadEmail?.isLoading,
);
