import { createReducer } from '@/redux/root';
import { logoutAction } from '@/redux/auth';
import { areaNameSpace, requestBranchesSummariesAsync, requestTeamsSummariesAsync } from './actions';

const initialState = {
  teamsSummaries: null,
  branchesSummaries: null,
};

export const areaReducer = createReducer(areaNameSpace, initialState, {
  [requestTeamsSummariesAsync.success]: ({ state, action }) => {
    state.teamsSummaries = action.payload ?? [];
  },

  [requestBranchesSummariesAsync.success]: ({ state, action }) => {
    state.branchesSummaries = action.payload ?? [];
  },

  [logoutAction]: ({ state }) => {
    state.teamsSummaries = initialState.teamsSummaries;
    state.branchesSummaries = initialState.branchesSummaries;
  },
});
