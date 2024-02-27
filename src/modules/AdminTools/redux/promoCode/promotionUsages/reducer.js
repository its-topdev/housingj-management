import { createReducer } from '@/redux/root';
import {
  promotionUsageNameSpace,
  requestPromotionUsagesAsync,
  createPromotionUsageAsync,
  removePromotionUsageAsync,
} from './';
import { NAME } from './selectors';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

const PromotionUsages = (promotionUsages) => {
  const promotionUsagesMap = new Map();
  promotionUsages.forEach((promotionUsage) => promotionUsagesMap.set(+promotionUsage.id, promotionUsage));

  return {
    get: (id) => promotionUsagesMap.get(+id),
    promotionUsages,
    options: toOptions(promotionUsages),
    create: (promotionUsage) => PromotionUsages([...promotionUsages, promotionUsage]),
    remove: (promotionUsageId) =>
      PromotionUsages(promotionUsages.filter(({ id }) => id !== promotionUsageId)),
  };
};

const promotionUsagesInitialState = {
  promotionUsages: PromotionUsages([]),
};

export const promotionUsagesReducer = {
  [NAME]: createReducer(promotionUsageNameSpace, promotionUsagesInitialState, {
    [requestPromotionUsagesAsync.success]: ({ state, action: { payload } }) => {
      state.promotionUsages = PromotionUsages(payload);
    },

    [createPromotionUsageAsync.success]: ({ state, action: { payload } }) => {
      state.promotionUsages = state.promotionUsages.create(payload);
    },

    [removePromotionUsageAsync.success]: ({ state, action: { payload } }) => {
      state.promotionUsages = state.promotionUsages.remove(payload);
    },
  }),
};
