import { createReducer } from '@/redux/root';
import { apartmentNameSpace, requestComplexesAsync, setSelectedApartmentAction, resetSelectedApartmentAction, requestApartmentSummariesAsync, requestPaymentMethodsAsync, requestPaymentTypesAsync } from './actions';

const initialState = {
  complexes: [],
  complexesTotal: 0,
  selected: {},
  apartmentSummaries: [],
  paymentMethods: [],
  paymentTypes: [],
};

export const apartmentReducer = createReducer(apartmentNameSpace, initialState, {
  [requestComplexesAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;

    state.complexes = items;
    state.complexesTotal = total;
  },

  [setSelectedApartmentAction]: ({ state, action }) => {
    state.selected = {
      ...state.selected,
      ...action.payload,
    };
  },

  [requestApartmentSummariesAsync.success]: ({ state, action }) => {
    state.apartmentSummaries = action.payload ?? [];
  },

  [requestPaymentMethodsAsync.success]: ({ state, action }) => {
    state.paymentMethods = action.payload ?? [];
  },

  [requestPaymentTypesAsync.success]: ({ state, action }) => {
    state.paymentTypes = action.payload ?? [];
  },

  [resetSelectedApartmentAction]: ({ state }) => {
    state.selected = {};
  },
});
