import * as Api from '@/api/api';

const api = process.env.REACT_APP_PLAN_BUILDER_API;

const path = '/api/v1/promo-code/referral-usages';

export const getReferralUsages = Api.get({ path, api });

export const removeReferralUsage = (id) =>
  Api.remove({ path: `${path}/${id}`, api });

export const createReferralUsage = Api.post({ path, api });
