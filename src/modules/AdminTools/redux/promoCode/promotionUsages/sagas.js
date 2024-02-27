import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '@/modules/AdminTools/api/promoCode';
import { createRequestSaga } from '@/redux/helpers';
import {
  requestPromotionUsagesAsync,
  removePromotionUsageAsync,
  createPromotionUsageAsync,
} from './actions';
import { addErrorAction } from '@/redux/errors';

const createOnErrorHandler = (errKey) =>
  function* onError({ errors }, { action: { payload } = {} }) {
    yield put(addErrorAction({ errKey, error: errors }));
  };

function* requestPromotionUsagesSaga({ payload }) {
  const response = yield call(Api.getPromotionUsages, payload, {
    withCredentials: false,
  });

  yield put(requestPromotionUsagesAsync.success(response));
}

function* removePromotionUsageSaga({ payload: id }) {
  yield call(Api.removePromotionUsage(id), undefined, {
    withCredentials: false,
  });

  yield put(removePromotionUsageAsync.success(id));
}

function* createPromotionUsageSaga({ payload }) {
  const response = yield call(Api.createPromotionUsage, payload, {
    withCredentials: false,
  });

  yield put(createPromotionUsageAsync.success(response));
}

export function* promotionUsagesWatcher() {
  yield takeLatest(
    requestPromotionUsagesAsync.request.type,
    createRequestSaga(requestPromotionUsagesSaga, {
      keyNew: 'promotionUsages',
      errKey: 'promotionUsages',
      write: false,
    })
  );

  yield takeLatest(
    removePromotionUsageAsync.request.type,
    createRequestSaga(removePromotionUsageSaga, {
      keyNew: 'promotionUsages',
      errKey: 'promotionUsages',
      write: false,
    })
  );

  yield takeLatest(
    createPromotionUsageAsync.request.type,
    createRequestSaga(createPromotionUsageSaga, {
      keyNew: 'promotionUsagesUpdate',
      errKey: 'promotionUsagesUpdate',
      write: false,
      onError: createOnErrorHandler('promotionUsagesUpdate'),
    })
  );
}
