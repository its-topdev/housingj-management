import * as Api from '@/api/api';

const api = process.env.REACT_APP_ONB_API;

export const getArchivedLeads = Api.get({ path: '/api/v1/users/archived-leads', api });

export const deleteLeadEmail = (leadId) => Api.post({ path: `/api/v1/users/delete-lead-email/${leadId}`, api });
