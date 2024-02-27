import { createSelector } from 'reselect';

const loadingSelector = (state) => state.loading;

export const isTeamsSummariesLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.teamsSummaries?.isLoading,
);

export const isCreateComplexLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.createComplex?.isLoading,
);

export const isDealersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.dealers?.isLoading,
);

export const isComplexesLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.complexes?.isLoading,
);

export const isApartmentLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.apartment?.isLoading,
);

export const isLedgerListLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.archiveLedger?.isLoading || state?.ledgerList?.isLoading,
);

export const isImportLedgersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.importLedgers?.isLoading,
);

export const isExportLedgersLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.exportLedgers?.isLoading,
);

export const isImportLedgersTemplateLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.importLedgersTemplate?.isLoading,
);

export const isLedgerFormLoadingSelector = createSelector(
  loadingSelector,
  (state) => state?.teamsSummaries?.isLoading ||
    state?.partnerships?.isLoading ||
    state?.dealers?.isLoading ||
    state?.apartmentSummaries?.isLoading ||
    state?.branchesSummaries?.isLoading ||
    state?.createLedger?.isLoading ||
    state?.createNote?.isLoading,
);

export const apartmentFormLoadingSelector = createSelector(
  [
    isDealersLoadingSelector,
    isComplexesLoadingSelector,
    isApartmentLoadingSelector,
  ],
  (
    isDealersLoading,
    isComplexesLoading,
    isApartmentLoading,
  ) => (
    isDealersLoading || isComplexesLoading || isApartmentLoading
  ),
);
