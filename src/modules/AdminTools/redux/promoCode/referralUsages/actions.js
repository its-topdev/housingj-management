import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const referralUsageNameSpace = `${nameSpace}/referralUsage`;

export const requestReferralUsagesAsync = createAsyncAction(
  `${referralUsageNameSpace}/REQUEST_REFERRAL_USAGES`
);

export const removeReferralUsageAsync = createAsyncAction(
  `${referralUsageNameSpace}/REMOVE_REFERRAL_USAGE`
);

export const createReferralUsageAsync = createAsyncAction(
  `${referralUsageNameSpace}/CREATE_REFERRAL_USAGE`
);
