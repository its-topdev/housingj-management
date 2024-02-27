import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/promo-code/promotion-usages';

export const getPromotionUsages = Api.get({ path, api });

export const removePromotionUsage = (id) =>
  Api.remove({ path: `${path}/${id}`, api });

export const createPromotionUsage = Api.post({ path, api });
