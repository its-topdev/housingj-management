import * as Api from '@/api/api';

const api = process.env.REACT_APP_HOUSING_API;

export const createApartmentComplex = Api.post({ path: '/api/v1/housing/apartment/complexes', api });

export const createApartment = (complexId) => Api.post({ path: `/api/v1/housing/apartment/complexes/${complexId}/apartments`, api });

export const updateApartment = (complexId, apartmentId) => Api.post({ path: `/api/v1/housing/apartment/complexes/${complexId}/apartments/${apartmentId}`, api });

export const getComplexes = Api.get({ path: '/api/v1/housing/apartment/complexes', api });

export const getApartmentSummaries = Api.get({ path: '/api/v1/housing/apartment/apartments-summaries', api });

export const getPaymentMethods = Api.get({ path: '/api/v1/housing/apartment/payment-methods', api });

export const getPaymentTypes = Api.get({ path: '/api/v1/housing/apartment/payment-types', api });

export const getComplexSummaries = Api.get({ path: '/api/v1/housing/apartment/complexes-summaries', api });
