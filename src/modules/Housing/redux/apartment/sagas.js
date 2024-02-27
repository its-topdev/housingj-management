import { call, put, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import Api, { Mapper } from '../../api';
import { createApartmentComplexAsync, requestApartmentSummariesAsync, requestPaymentMethodsAsync, requestPaymentTypesAsync } from './actions';
import { addToastsAction } from '@/redux/toasts';
import { mapErrorToastsData } from '@/lib/api';
import { createApartmentAsync, updateApartmentAsync, requestComplexesAsync } from '@/modules/Housing/redux/apartment';

function* createApartmentComplexSaga({ payload }) {
  try {
    const { data, successCallback } = payload;
    yield call(
      Api.createApartmentComplex,
      Mapper.prepareDataForCreateComplex(data),
      { withCredentials: false },
    );

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* createApartmentSags({ payload }) {
  try {
    const { data, complexId, successCallback } = payload;
    yield call(
      Api.createApartment(complexId),
      Mapper.prepareDataForApartment(data),
      { withCredentials: false },
    );

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* updateApartmentSaga({ payload }) {
  try {
    const { data, complexId, apartmentId, successCallback } = payload;
    yield call(
      Api.updateApartment(complexId, apartmentId),
      Mapper.prepareDataForApartment(data),
      { withCredentials: false },
    );

    if (successCallback) {
      yield call(successCallback);
    }
  } catch (error) {
    yield put(addToastsAction(mapErrorToastsData(error)));

    throw error;
  }
}

function* requestComplexes({ payload }) {
  const response = yield call(
    Api.getComplexes,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestComplexesAsync.success(Mapper.getComplexes(response)));
}

function* requestApartmentSummariesSaga({ payload }) {
  const response = yield call(
    Api.getApartmentSummaries,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestApartmentSummariesAsync.success(Mapper.getApartmentSummaries(response)));
}

function* requestPaymentMethodsSaga({ payload }) {
  const response = yield call(
    Api.getPaymentMethods,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestPaymentMethodsAsync.success(Mapper.getPaymentMethods(response)));
}

function* requestPaymentTypesSaga({ payload }) {
  const response = yield call(
    Api.getPaymentTypes,
    { ...payload },
    { withCredentials: false },
  );

  yield put(requestPaymentTypesAsync.success(Mapper.getPaymentTypes(response)));
}

export function* apartmentWatcher() {
  yield takeLatest(
    createApartmentComplexAsync.request.type,
    createRequestSaga(createApartmentComplexSaga, {
      keyNew: 'createComplex',
      errKey: 'createComplex',
      write: true,
    }),
  );
  yield takeLatest(
    createApartmentAsync.request.type,
    createRequestSaga(createApartmentSags, {
      keyNew: 'apartment',
      errKey: 'apartment',
      write: true,
    }),
  );
  yield takeLatest(
    updateApartmentAsync.request.type,
    createRequestSaga(updateApartmentSaga, {
      keyNew: 'apartment',
      errKey: 'apartment',
      write: true,
    }),
  );
  yield takeLatest(
    requestComplexesAsync.request.type,
    createRequestSaga(requestComplexes, {
      keyNew: 'complexes',
      errKey: 'complexes',
      write: true,
    }),
  );
  yield takeLatest(
    requestApartmentSummariesAsync.request.type,
    createRequestSaga(requestApartmentSummariesSaga, {
      keyNew: 'apartmentSummaries',
      errKey: 'apartmentSummaries',
      write: true,
    }),
  );
  yield takeLatest(
    requestPaymentMethodsAsync.request.type,
    createRequestSaga(requestPaymentMethodsSaga, {
      keyNew: 'paymentMethods',
      errKey: 'paymentMethods',
      write: true,
    }),
  );
  yield takeLatest(
    requestPaymentTypesAsync.request.type,
    createRequestSaga(requestPaymentTypesSaga, {
      keyNew: 'paymentTypes',
      errKey: 'paymentTypes',
      write: true,
    }),
  );
}
