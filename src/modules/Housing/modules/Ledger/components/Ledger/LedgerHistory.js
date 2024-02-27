import { useState, useEffect } from "react";
import { Table } from '@/components';
import { Breadcrumbs } from '@/components/common';
import { parseLedgerHistoryRows, getLedgerHistoryHeadRows } from '@/modules/Housing/modules/Ledger/lib';
import { ledgerConstants } from '@/modules/Housing/lib';
import { addFsExcludeClass, mergeClassName } from '@/lib/utils';
import { SearchIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

const { LEDGER_HISTORY_SEARCH_NAME } = ledgerConstants;

const LedgerHistory = ({ledgerHistory, onClickBack}) => {

  const [ searchText, setSearchText ] = useState('');

  const filteredLedgerHistory = ledgerHistory.filter((history) => Object.values(history).toString().toLowerCase().includes(searchText.toLowerCase()));

  const ledgerHistoryRows = parseLedgerHistoryRows(filteredLedgerHistory);
  const breadcrumbLinks = [
    {
      linkName: 'Back to Ledger info',
      to: '#',
      action: () => onClickBack(),
    },
    {
      linkName: 'History',
      to: '#',
    }
  ];  

  return (
    <div className="sm:h-[474px] w-full overflow-y-auto">
      <div className='py-4 px-4 w-full justify-between flex'>
        <div className='items-center flex'>
          <Breadcrumbs
            breadcrumbLinks={breadcrumbLinks}
            activeLinkIndex={1}
          />
        </div>
        <div className="flex">
        <input
          id="search"
          type="text"
          name={LEDGER_HISTORY_SEARCH_NAME}
          placeholder={"Search history"}
          onChange={(e) => setSearchText(e.target.value)}
          className={addFsExcludeClass(
            'w-[268px] p-2.5 text-sm text-gray-500 bg-white grow border border-gray-200 border-r-0 rounded-l-md focus:z-10 focus:border-aptivegreen focus:border-r-aptivegreen' +
            ' focus:outline-none focus:ring-1 focus:ring-aptivegreen',
          )}
        />
        <button
          type="submit"
          className={mergeClassName(
            'w-14 flex justify-center items-center border border-gray-200 border-l-0 rounded-r-md bg-white hover:bg-gray-50 active:bg-gray-200 focus:outline-primary-300 transition-colors duration-200',
          )}
        >
          <SearchIcon className="h-5 w-5 text-primary-300" />
        </button>
        </div>
      </div>
      <div className="w-full sm:w-full overflow-hidden sm:overflow-y-auto">
        <Table
          thead={{ rows: getLedgerHistoryHeadRows() }}
          tbody={{
            rows: ledgerHistoryRows,
          }}
          wrapper={{
            className: 'rounded-none',
          }}
        />
      </div>
    </div>
  );
}

LedgerHistory.propTypes = {
  ledgerHistory: PropTypes.array,
  onClickBack: PropTypes.func,
};

export default LedgerHistory;
