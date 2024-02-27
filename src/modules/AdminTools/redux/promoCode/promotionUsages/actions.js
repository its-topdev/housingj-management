import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const promotionUsageNameSpace = `${nameSpace}/promotionUsage`;

export const requestPromotionUsagesAsync = createAsyncAction(
  `${promotionUsageNameSpace}/REQUEST_PROMOTION_USAGES`
);

export const removePromotionUsageAsync = createAsyncAction(
  `${promotionUsageNameSpace}/REMOVE_PROMOTION_USAGE`
);

export const createPromotionUsageAsync = createAsyncAction(
  `${promotionUsageNameSpace}/CREATE_PROMOTION_USAGE`
);
