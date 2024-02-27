export const usersManagementConstants = {
  LEAD_MANAGEMENT_SEARCH_NAME: 'lead',
  SEARCH_LEADS: 'Search Leads',

  ARCHIVED_LEAD_TYPE: 'lead',
  ARCHIVED_USER_TYPE: 'user',

  DELETE_LEAD_BUTTON: 'Delete Email',
  DELETE_LEAD_CONFIRMATION_TITLE: 'Are you sure you want to delete this lead\'s email',
};

export const repTypeSelectOptions = [
  {
    label: 'Users',
    value: usersManagementConstants.ARCHIVED_USER_TYPE,
  },
  {
    label: 'Leads',
    value: usersManagementConstants.ARCHIVED_LEAD_TYPE,
  },
];
