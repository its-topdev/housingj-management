import { createAsyncAction } from '@/redux/root';

const nameSpace = '@@/archived';

export const archivedLeadsNameSpace = `${nameSpace}/leads`;

export const requestArchivedLeadsAsync = createAsyncAction(`${nameSpace}/GET_ARCHIVED_LEADS`);

export const deleteLeadEmailAsync = createAsyncAction(`${nameSpace}/DELETE_LEAD_EMAIL`);
