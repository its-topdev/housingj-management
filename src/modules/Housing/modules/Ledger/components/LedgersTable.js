import { Table } from '@/components';
import { SearchBar } from '@/components/common';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  AddFilterButton,
  FilterDropdownButton,
  Button,
} from '@/modules/Housing/components/common';
import {
  getLedgerHeadRows,
  parseLedgerRows,
  parseFilter,
} from '@/modules/Housing/modules/Ledger/lib';
import { ledgerConstants } from '@/modules/Housing/lib';
import { isLedgerListLoadingSelector } from '@/modules/Housing/redux/loading';
import {
  requestLedgersAsync,
  ledgerListSelector,
  ledgerTotalSelector,
  archiveLedgerAsync,
  unArchiveLedgerAsync,
  setSelectedLedgerAction
} from '@/modules/Housing/redux/ledger';
import {
  requestBranchesSummariesAsync,
  requestTeamsSummariesAsync,
  branchesSummariesSelector,
  teamsSummariesSelector,
} from '@/modules/Housing/redux/area';
import {
  requestDealersAsync,
  requestPartnershipsAsync,
  dealersSelector,
  partnershipsSelector,
} from '@/modules/Housing/redux/partnership';
import {
  requestPaymentTypesAsync,
  requestComplexesAsync,
  requestPaymentMethodsAsync,
  complexesSelector,
  paymentMethodsSelector,
  paymentTypesSelector,
} from '@/modules/Housing/redux/apartment';

const { LEDGER_TYPE_FILTER_NAME, LEDGER_SEARCH_NAME } = ledgerConstants;

const LedgersTable = ({
  // Own Props
  initialPage,
  pageSize,
  setPageSize,
  selectedPage,
  setSelectedPage,
  onPageChange,
  searchText,
  setSearchText,
  searchType,
  setSearchType,
  ledgers,
  ledgersTotal,
  branches,
  requestBranchesSummaries,
  teams,
  requestTeamsSummaries,
  dealers,
  requestDealersSummaries,
  partnerships,
  requestPartnershipsSummaries,
  typeOfPayments,
  requestTypeOfPaymentsSummaries,
  complexes,
  requestComplexSummaries,
  paymentMethods,
  requestPaymentMethodsSummaries,
  isLoading,
  getLedgers,
  archiveLedger,
  unArchiveLedger,
  archived,
  setIsModalOpen,
  setSelectedLedger,
}) => {
  const onClickArchive = (ledgerId) => {
    const action = archived ? unArchiveLedger : archiveLedger;

    action({ ledgerId, successCallback: () => {
      getLedgers({
        page: {
          number: selectedPage,
          size: pageSize,
        },
        archived: archived,
      });
    }});
  };

  const ledgerRows = parseLedgerRows(
    ledgers ?? [],
    archived,
    onClickArchive,
    );

    const [filterValueOptions, setFilterValueOptions] = useState([]);
    const [filters, setFilters] = useState([]);

  useEffect(() => {
    const params = {
      page: {
        number: selectedPage,
        size: pageSize,
      },
      archived: archived,
      ...parseFilter(filters),
    };
    getLedgers(params);
  }, [getLedgers, selectedPage, pageSize, archived, filters]);

  const handleSearchClick = useCallback(
    ({ searchText, searchType }) => {
      setSearchText(searchText);
      setSearchType(searchType);
      setSelectedPage(initialPage);
    },
    [setSearchText, setSearchType, setSelectedPage, initialPage]
  );

  useEffect(() => {
    requestBranchesSummaries();
    requestTeamsSummaries();
    requestDealersSummaries();
    requestPartnershipsSummaries();
    requestTypeOfPaymentsSummaries();
    requestComplexSummaries();
    requestPaymentMethodsSummaries();
  }, []);

  const filterTypeOptions = [
    {
      onClick: () => setFilterValueOptions(branches),
      label: 'Branch',
      value: 'branch_ids',
    },
    {
      onClick: () => {
        setFilterValueOptions(teams.map((team) => ({ name: team.label, value: team.value })));
      },
      label: 'Team',
      value: 'team_ids',
    },
    {
      onClick: () => setFilterValueOptions(dealers),
      label: 'Dealer',
      value: 'dealer_ids',
    },
    {
      onClick: () => setFilterValueOptions(partnerships),
      label: 'Partnership',
      value: 'partnership_ids',
    },
    {
      onClick: () => setFilterValueOptions(typeOfPayments),
      label: 'Type of Payment',
      value: 'payment_type_ids',
    },
    {
      onClick: () => {
        setFilterValueOptions(
          complexes.map((complex) => ({ name: complex.name, value: complex.id }))
        );
      },
      label: 'Complex',
      value: 'complex_ids',
    },
    {
      onClick: () => setFilterValueOptions(paymentMethods),
      label: 'Payment Method',
      value: 'payment_method_ids',
    },
  ];

  return (
    <>{!isLoading && (
        <div className="mt-4 border border-solid border-gray-300 rounded-t-lg p-2 border-b-0 bg-white self-stretch flex items-center justify-between">
          <SearchBar
            searchType={searchType}
            searchText={searchText}
            inputName={LEDGER_TYPE_FILTER_NAME}
            selectName={LEDGER_SEARCH_NAME}
            onSearchClick={handleSearchClick}
          />
          <div className="mr-4 flex items-center gap-6">
            {filters.map((filter, index) => {
              let options;
              switch (filter.type.value) {
                case 'branch_ids':
                  options = branches;
                  break;
                case 'team_ids':
                  options = teams.map((team) => ({ name: team.label, value: team.value}));
                  break;
                case 'dealer_ids':
                  options = dealers;
                  break;
                case 'partnership_ids':
                  options = partnerships;
                  break;
                case 'payment_type_ids':
                  options = typeOfPayments;
                  break;
                case 'complex_ids':
                  options = complexes.map((complex) => ({ name: complex.name, value: complex.id }));
                  break;
                case 'payment_method_ids':
                  options = paymentMethods;
                  break;
                default:
                  break;
              }
              return (
                <FilterDropdownButton
                  buttonClassName="border border-gray-200 rounded-lg px-4 py-2 gap-1 inline-flex items-center"
                  iconClassName="w-4 h-4 text-gray-600"
                  labelClassName="text-gray-600 text-based font-normal sm:text-xs leading-none"
                  filterValueOptions={options}
                  filters={filters}
                  setFilters={setFilters}
                  key={index}
                  index={index}
                />
              );
            })}

            <AddFilterButton
              filterTypeOptions={filterTypeOptions}
              filterValueOptions={filterValueOptions}
              setFilters={setFilters}
              filters={filters}
              label={'+ Add Filters'}
            />
            <div>
              <Button color={'default'} onClick={() => setFilters([])} className='text-gray-600 text-right font-normal sm:text-xs leading-none border-none shadow-none'>Clear Filters</Button>
            </div>          
          </div>
        </div>
      )}
      <Table
        loading={isLoading}
        thead={{ rows: getLedgerHeadRows() }}
        tbody={{
          rows: ledgerRows,
          data: ledgers,
          classNames: 'hover:cursor-pointer',
          onSelect: (data) => {
            setIsModalOpen(true);
            setSelectedLedger(data);
          },
        }}
        paginator={{
          pageSize,
          setPageSize,
          onPageChange,
          selectedPage,
          initialPage,
          rowCount: ledgersTotal,
        }}
        wrapper={{
          className: 'overflow-y-visible rounded-t-none',
        }}
      />
    </>
  );
};

LedgersTable.propTypes = {
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  selectedPage: PropTypes.number,
  setSelectedPage: PropTypes.func,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  searchType: PropTypes.string,
  setSearchType: PropTypes.func,
  ledgers: PropTypes.array,
  ledgersTotal: PropTypes.number,
  getLedgers: PropTypes.func,
  archiveLedger: PropTypes.func,
  unArchiveLedger: PropTypes.func,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  branches: PropTypes.array,
  requestBranchesSummaries: PropTypes.func,
  teams: PropTypes.array,
  requestTeamsSummaries: PropTypes.func,
  dealers: PropTypes.array,
  requestDealersSummaries: PropTypes.func,
  partnerships: PropTypes.array,
  requestPartnershipsSummaries: PropTypes.func,
  typeOfPayments: PropTypes.array,
  requestTypeOfPaymentsSummaries: PropTypes.func,
  complexes: PropTypes.array,
  requestComplexSummaries: PropTypes.func,
  paymentMethods: PropTypes.array,
  requestPaymentMethodsSummaries: PropTypes.func,
  archived: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  setSelectedLedger: PropTypes.func,
};

const mapStateToProps = (state) => ({
  ledgers: ledgerListSelector(state),
  branches: branchesSummariesSelector(state),
  teams: teamsSummariesSelector(state),
  dealers: dealersSelector(state),
  partnerships: partnershipsSelector(state),
  typeOfPayments: paymentTypesSelector(state),
  complexes: complexesSelector(state),
  paymentMethods: paymentMethodsSelector(state),
  ledgersTotal: ledgerTotalSelector(state),
  isLoading: isLedgerListLoadingSelector(state),
});

const mapDispatchToProps = {
  getLedgers: requestLedgersAsync.request,
  archiveLedger: archiveLedgerAsync.request,
  unArchiveLedger: unArchiveLedgerAsync.request,
  requestBranchesSummaries: requestBranchesSummariesAsync.request,
  requestTeamsSummaries: requestTeamsSummariesAsync.request,
  requestDealersSummaries: requestDealersAsync.request,
  requestPartnershipsSummaries: requestPartnershipsAsync.request,
  requestTypeOfPaymentsSummaries: requestPaymentTypesAsync.request,
  requestComplexSummaries: requestComplexesAsync.request,
  requestPaymentMethodsSummaries: requestPaymentMethodsAsync.request,
  setSelectedLedger: setSelectedLedgerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LedgersTable);
