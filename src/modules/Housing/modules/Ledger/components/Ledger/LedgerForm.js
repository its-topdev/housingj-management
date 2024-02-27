import {useCallback, useEffect, useMemo, useState} from 'react';
import { OfficeBuildingIcon } from '@heroicons/react/outline';
import { CustomButton } from '@/components';
import { DropdownButton, Button } from '@/modules/Housing/components/common';
import LedgerFooter from './LedgerFooter';
import LedgerHeader from './LedgerHeader';
import LedgerInfo from './LedgerInfo';
import LedgerHistory from './LedgerHistory';
import { ledgerValidationSchema } from './LedgerValidationSchema';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { createLedgerAsync, ledgerSelector, createNoteAsync, requestLedgerHistoryAsync, ledgerHistorySelector } from '@/modules/Housing/redux/ledger';
import {
  branchesSummariesSelector,
  requestBranchesSummariesAsync,
  requestTeamsSummariesAsync,
  teamsSummariesSelector,
} from '@/modules/Housing/redux/area';
import {
  apartmentSummariesSelector,
  paymentMethodsSelector,
  paymentTypesSelector,
  requestApartmentSummariesAsync,
  requestPaymentMethodsAsync,
  requestPaymentTypesAsync,
} from '@/modules/Housing/redux/apartment';
import {
  partnershipsSelector,
  requestPartnershipsAsync,
  dealersSelector,
  requestDealersAsync
} from '@/modules/Housing/redux/partnership';
import PropTypes from 'prop-types';
import NotesForm from '../Notes/NotesForm';
import { useStableCallback } from '@/hooks';
import { PageLoader } from '@/components/common';
import { isLedgerFormLoadingSelector } from '@/modules/Housing/redux/loading';

const LedgerForm = ({
  onClose,
  ledger,
  branches,
  dealers,
  teams,
  partnerships,
  apartments,
  paymentTypes,
  paymentMethods,
  requestBranchesSummaries,
  requestTeamsSummaries,
  requestPartnerships,
  requestApartmentSummaries,
  requestPaymentMethods,
  requestPaymentTypes,
  createLedger,
  createNote,
  getDealers,
  getLedgerHistory,
  ledgerHistory,
  isLedgerFormLoading,
}) => {
  const ledgerManageOptions = [
    {
      label: 'Export as CSV'
    },
    {
      label: 'Export as Excel'
    },
    {
      label: 'Archive ledger'
    },
    {
      label: 'Delete ledger'
    },
  ]

  const teamOptions = useMemo(() => {
    if (!teams) {
      return [];
    }

    return teams.map((team) => ({
      name: team?.label,
      value: team?.value,
    }));
  }, [teams]);

  const [ noteValue, setNoteValue ] = useState('');
  const [ isSearchTab, setIsSearchTab ] = useState(false);

  const methods = useForm({
    defaultValues: {
      ...ledger,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(ledgerValidationSchema),
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    getValues,
    reset,
  } = methods;

  const {
    dealer_id,
    branch_id,
  } = getValues();

  const onFormClose = () => {
    reset();
    onClose();
  }

  const handleSubmitForm = useStableCallback((onSuccess) => {
    createLedger({
      data: getValues(),
      successCallback: (ledgerId) => {
        if (noteValue === '') {
          onFormClose();
        } else {
          createNote({
            data: { ledgerRecordId: ledgerId, note: noteValue },
            successCallback: onFormClose,
          });
        }
      },
    });
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setValue(name, value, { shouldValidate: true, shouldDirty: true });
  }, [
    setValue,
  ]);

  const handleTeamChange = async ({ target: { value } }) => {
    setValue('team_id', value);
    await requestApartmentSummaries({ team_id: value });
  };

  const handleBranchChange = async ({ target: { value } }) => {
    setValue('branch_id', value);

    if (dealer_id && value) {
      await requestTeamsSummaries({ dealer_id: dealer_id, branch_id: value });
    }
  };

  const handleDealerChange = async ({ target: { value } }) => {
    setValue('dealer_id', value);
    await requestPartnerships({ dealer_id: value });

    if (branch_id && value) {
      await requestTeamsSummaries({ branch_id: branch_id, dealer_id: value });
    }
  };

  const handleClickHistory = () => {
    setIsSearchTab(true);
  };

  useEffect(() => {
    if(ledger.id) {
    getLedgerHistory({ ledgerRecordId: ledger.id });
    requestTeamsSummaries({ dealer_id: ledger.dealer_id, branch_id: ledger.branch_id });
    requestPartnerships({ dealer_id: ledger.dealer_id });
    requestApartmentSummaries({ team_id: ledger.team_id });
    }
  }, [ledger.id]);

  useEffect(
    () => {
      requestBranchesSummaries();
      requestPaymentTypes();
      requestPaymentMethods();
      getDealers();
    },
    [],
  );

  return (
    <div className="w-[989px]">
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
          <LedgerHeader>
            <div className="flex justify-between">
              <div className='flex items-center'>
                <OfficeBuildingIcon color="gray" className="mr-2 w-6 h-6" />
                {ledger.id ? (
                  <h1 className="font-semibold text-lg">
                    Ledger record: #{ledger.id}
                  </h1>
                ) : (
                  <h1 className="font-semibold text-lg">
                    Add new ledger record
                  </h1>
                )}
              </div>
              {ledger.id && (
                <div className='flex items-center gap-8'>
                  { !isSearchTab && (
                    <Button color={'default'} className={'font-inter text-base font-normal leading-6 text-right text-gray-700'} onClick={handleClickHistory}>
                      View history
                    </Button>
                  )}
                  <DropdownButton
                    buttonClassName={'px-3 py-2 rounded-lg border border-gray-200 justify-start items-center gap-1 flex'}
                    labelClassName={'font-inter text-base font-normal leading-6 text-right text-gray-700'}
                    label='Manage ledger'
                    options={ledgerManageOptions}
                  />
                </div>
              )}
            </div>
          </LedgerHeader>
          <div className="flex flex-wrap overflow-hidden">
            {!isSearchTab ? (
              <>
                <div className="p-6 w-full sm:w-2/3 sm:h-[474px] overflow-hidden sm:overflow-y-auto">
                  {isLedgerFormLoading
                  ? <PageLoader />
                  : <LedgerInfo
                      branches={branches}
                      apartments={apartments}
                      teams={teamOptions}
                      dealers={dealers}
                      partnerships={partnerships}
                      paymentMethods={paymentMethods}
                      paymentTypes={paymentTypes}
                      onTeamChange={handleTeamChange}
                      onBranchChange={handleBranchChange}
                      onDealerChange={handleDealerChange}
                      onChangeHandler={handleChange}
                    />}
                </div>
                <div className="w-full sm:w-1/3 sm:h-[474px] overflow-hidden sm:overflow-y-auto">
                  <NotesForm setNoteValue={setNoteValue} note={noteValue} />
                </div>
              </>
            )
            : (
              <LedgerHistory ledgerHistory={ledgerHistory} onClickBack={() => setIsSearchTab(false)} />
            )
          }
          </div>
          <LedgerFooter>
            <div className="flex">
              <div className="ml-auto">
                <Button color="white" onClick={onFormClose} className="mr-4">Cancel</Button>
                <CustomButton type="submit" color="active" disabled={!isValid}>Submit</CustomButton>
              </div>
            </div>
          </LedgerFooter>
        </form>
      </FormProvider>
    </div>
  );
};

LedgerForm.propTypes = {
  ledger: PropTypes.object,
  note: PropTypes.string,
  notes: PropTypes.array,
  teams: PropTypes.array,
  branches: PropTypes.array,
  apartments: PropTypes.array,
  paymentMethods: PropTypes.array,
  paymentTypes: PropTypes.array,
  partnerships: PropTypes.array,
  requestTeamsSummaries: PropTypes.func,
  requestBranchesSummaries: PropTypes.func,
  requestApartmentSummaries: PropTypes.func,
  requestPaymentMethods: PropTypes.func,
  requestPaymentTypes: PropTypes.func,
  requestPartnerships: PropTypes.func,
  createLedger: PropTypes.func,
  createNote: PropTypes.func,
  getDealers: PropTypes.func,
  getLedgerHistory: PropTypes.func,
  ledgerHistory: PropTypes.array,
  isLedgerFormLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ledger: ledgerSelector(state),
  teams: teamsSummariesSelector(state),
  dealers: dealersSelector(state),
  branches: branchesSummariesSelector(state),
  apartments: apartmentSummariesSelector(state),
  paymentMethods: paymentMethodsSelector(state),
  paymentTypes: paymentTypesSelector(state),
  partnerships: partnershipsSelector(state),
  ledgerHistory: ledgerHistorySelector(state),
  isLedgerFormLoading: isLedgerFormLoadingSelector(state),
});

const mapDispatchToProps = {
  requestTeamsSummaries: requestTeamsSummariesAsync.request,
  requestBranchesSummaries: requestBranchesSummariesAsync.request,
  requestApartmentSummaries: requestApartmentSummariesAsync.request,
  requestPaymentMethods: requestPaymentMethodsAsync.request,
  requestPaymentTypes: requestPaymentTypesAsync.request,
  requestPartnerships: requestPartnershipsAsync.request,
  createLedger: createLedgerAsync.request,
  createNote: createNoteAsync.request,
  getDealers: requestDealersAsync.request,
  getLedgerHistory: requestLedgerHistoryAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(LedgerForm);
