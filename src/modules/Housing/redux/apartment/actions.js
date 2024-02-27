import { createAction, createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const apartmentNameSpace = `${nameSpace}/apartment`;

export const createApartmentComplexAsync = createAsyncAction(`${nameSpace}/CREATE_APARTMENT_COMPLEX`);

export const createApartmentAsync = createAsyncAction(`${nameSpace}/CREATE_APARTMENT`);

export const updateApartmentAsync = createAsyncAction(`${nameSpace}/UPDATE_APARTMENT`);

export const requestComplexesAsync = createAsyncAction(`${nameSpace}/GET_COMPLEXES`);

export const setSelectedApartmentAction = createAction(`${nameSpace}/SET_SELECTED_APARTMENT`);

export const resetSelectedApartmentAction = createAction(`${nameSpace}/RESET_SELECTED_APARTMENT`);

export const requestApartmentSummariesAsync = createAsyncAction(`${nameSpace}/GET_APARTMENT_SUMMAIRES`);

export const requestPaymentMethodsAsync = createAsyncAction(`${nameSpace}/GET_PAYMENT_METHODS`);

export const requestPaymentTypesAsync = createAsyncAction(`${nameSpace}/GET_PAYMENT_TYPES`);
