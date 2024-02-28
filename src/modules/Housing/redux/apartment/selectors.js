import { createSelector } from 'reselect';
import { apartmentConstants } from '@/modules/Housing/lib';

const {
  UNIT_INFORMATION_FORM_NAME,
  FURNITURE_FORM_NAME,
  UTILITIES_FORM_NAME,
  LEASE_DETAILS_FORM_NAME,
  MOVE_OUT_FORM_NAME,
  DOCUMENT_UPLOAD_FORM_NAME,
} = apartmentConstants;

const apartmentSelector = (state) => state.apartment;

const selectedSelector = (state) => state.apartment.selected;

export const complexesSelector = createSelector(
  apartmentSelector,
  (state) => state?.complexes,
);

export const complexesTotalSelector = createSelector(
  apartmentSelector,
  (state) => state?.complexesTotal,
);

export const complexSummariesSelector = createSelector(
  apartmentSelector,
  (state) => state?.complexSummaries,
);

export const apartmentSummariesSelector = createSelector(
  apartmentSelector,
  (state) => state?.apartmentSummaries,
);

export const paymentMethodsSelector = createSelector(
  apartmentSelector,
  (state) => state?.paymentMethods,
);

export const paymentTypesSelector = createSelector(
  apartmentSelector,
  (state) => state?.paymentTypes,
);

export const unitInformationDataSelector = createSelector(
  selectedSelector,
  (selected) => selected[UNIT_INFORMATION_FORM_NAME],
);

export const furnitureDataSelector = createSelector(
  selectedSelector,
  (selected) => selected[FURNITURE_FORM_NAME],
);

export const utilitiesDataSelector = createSelector(
  selectedSelector,
  (selected) => selected[UTILITIES_FORM_NAME],
);

export const leaseDataSelector = createSelector(
  selectedSelector,
  (selected) => selected[LEASE_DETAILS_FORM_NAME],
);

export const moveOutSelector = createSelector(
  selectedSelector,
  (selected) => selected[MOVE_OUT_FORM_NAME],
);

export const documentUploadDataSelector = createSelector(
  selectedSelector,
  (selected) => selected[DOCUMENT_UPLOAD_FORM_NAME],
);

export const apartmentDataSelector = createSelector(
  [unitInformationDataSelector, furnitureDataSelector, utilitiesDataSelector, leaseDataSelector, moveOutSelector, documentUploadDataSelector],
  (unitInformationData, furnitureData, utilitiesData, leaseDetailsData, moveOutData, documentUploadData) => ({
    [UNIT_INFORMATION_FORM_NAME]: unitInformationData,
    [FURNITURE_FORM_NAME]: furnitureData,
    [UTILITIES_FORM_NAME]: utilitiesData,
    [LEASE_DETAILS_FORM_NAME]: leaseDetailsData,
    [MOVE_OUT_FORM_NAME]: moveOutData,
    [DOCUMENT_UPLOAD_FORM_NAME]: documentUploadData,
  }),
);
