import { createReducer } from '@/redux/root';
import {
  referralUsageNameSpace,
  requestReferralUsagesAsync,
  createReferralUsageAsync,
  removeReferralUsageAsync,
} from './';
import { NAME } from './selectors';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

const ReferralUsages = (referralUsages) => {
  const referralUsagesMap = new Map();
  referralUsages.forEach((referralUsage) => referralUsagesMap.set(+referralUsage.id, referralUsage));

  return {
    get: (id) => referralUsagesMap.get(+id),
    referralUsages,
    options: toOptions(referralUsages),
    create: (referralUsage) => ReferralUsages([...referralUsages, referralUsage]),
    remove: (referralUsageId) =>
      ReferralUsages(referralUsages.filter(({ id }) => id !== referralUsageId)),
  };
};

const referralUsagesInitialState = {
  referralUsages: ReferralUsages([]),
};

export const referralUsagesReducer = {
  [NAME]: createReducer(referralUsageNameSpace, referralUsagesInitialState, {
    [requestReferralUsagesAsync.success]: ({ state, action: { payload } }) => {
      state.referralUsages = ReferralUsages(payload);
    },

    [createReferralUsageAsync.success]: ({ state, action: { payload } }) => {
      state.referralUsages = state.referralUsages.create(payload);
    },

    [removeReferralUsageAsync.success]: ({ state, action: { payload } }) => {
      state.referralUsages = state.referralUsages.remove(payload);
    },
  }),
};
