import { createAsyncAction, createAction } from '@/redux/root';

export const nameSpace = '@@/housing';

export const requestLedgersAsync = createAsyncAction(`${nameSpace}/GET_LEDGERS`);

export const archiveLedgerAsync = createAsyncAction(`${nameSpace}/ARCHIVE_LEDGER`);

export const unArchiveLedgerAsync = createAsyncAction(`${nameSpace}/UN_ARCHIVE_LEDGER`);

export const importLedgersAsync = createAsyncAction(`${nameSpace}/IMPORT_LEDGER`);

export const importLedgersTemplateAsync = createAsyncAction(`${nameSpace}/IMPORT_LEDGER_TEMPLATE`);

export const exportLedgersAsync = createAsyncAction(`${nameSpace}/RESET_SELECTED_LEDGER`);

export const createLedgerAsync = createAsyncAction(`${nameSpace}/CREATE_LEDGER`);

export const editLedgerAsync = createAsyncAction(`${nameSpace}/UPDATE_LEDGER`);

export const createNoteAsync = createAsyncAction(`${nameSpace}/CREAT_NOTE`);

export const resetSelectedLedgerAction = createAction(`${nameSpace}/RESET_SELECTED_LEDGER`);

export const setSelectedLedgerAction = createAction(`${nameSpace}/SET_SELECTED_LEDGER`);

export const requestLedgerHistoryAsync = createAsyncAction(`${nameSpace}/GET_LEDGER_HISTORY`);

export const requestLedgerNotesAsync = createAsyncAction(`${nameSpace}/GET_LEDGER_NOTES`);
