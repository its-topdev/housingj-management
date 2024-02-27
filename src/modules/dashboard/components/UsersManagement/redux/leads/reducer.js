import { createReducer } from '@/redux/root';
import { archivedLeadsNameSpace, requestArchivedLeadsAsync } from './actions';
import { formatPhone } from '@/lib/utils';

const initialState = {
  archivedLeads: [],
  archivedLeadsTotal: 0,
};

export const archivedLeadsReducer = createReducer(archivedLeadsNameSpace, initialState, {
  [requestArchivedLeadsAsync.success]: ({ state, action: { payload } }) => {
    state.archivedLeads = payload.data.map(({ attributes }) => ({
      id: attributes.lead_id,
      name: attributes.name,
      email: attributes.email,
      phone_number: formatPhone(attributes.mobile),
      experience_name: attributes.experience_name,
      is_email_deleted: attributes.is_email_deleted,
    }))
    state.archivedLeadsTotal = payload.meta.total
  },
});
