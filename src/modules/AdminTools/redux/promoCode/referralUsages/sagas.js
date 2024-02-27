import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/promoCode';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestReferralUsagesAsync,
  removeReferralUsageAsync,
  createReferralUsageAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* requestReferralUsagesSaga({ payload }) {
  const response = yield call(Api.getReferralUsages, payload, {
    withCredentials: false,
  });

  yield put(requestReferralUsagesAsync.success(response));
}

function* removeReferralUsageSaga({ payload: id }) {
  yield call(Api.removeReferralUsage(id), undefined, {
    withCredentials: false,
  });

  yield put(removeReferralUsageAsync.success(id));
}

function* createReferralUsageSaga({ payload }) {
  const response = yield call(Api.createReferralUsage, payload, {
    withCredentials: false,
  });

  yield put(createReferralUsageAsync.success(response));
}

export function* referralUsagesWatcher() {
  yield takeLatest(
    requestReferralUsagesAsync.request.type,
    createRequestSaga(requestReferralUsagesSaga, {
      keyNew: 'referralUsages',
      errKey: 'referralUsages',
      write: false,
    })
  );

  yield takeLatest(
    removeReferralUsageAsync.request.type,
    createRequestSaga(removeReferralUsageSaga, {
      keyNew: 'referralUsages',
      errKey: 'referralUsages',
      write: false,
    })
  );

  yield takeLatest(
    createReferralUsageAsync.request.type,
    createRequestSaga(createReferralUsageSaga, {
      keyNew: 'referralUsagesUpdate',
      errKey: 'referralUsagesUpdate',
      write: false,
      onError: createOnErrorHandler('referralUsagesUpdate'),
    })
  );
}
