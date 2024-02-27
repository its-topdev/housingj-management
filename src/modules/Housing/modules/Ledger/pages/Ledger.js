import { DropdownButton } from '@/modules/Housing/components/common';
import { CustomButton, Loader } from '@/components/common';
import LedgersTable from '../components/LedgersTable';
import { useCallback, useState, useEffect, useRef } from 'react';
import {
  importLedgersAsync,
  importLedgersTemplateAsync,
  exportLedgersAsync,
} from '@/modules/Housing/redux/ledger';
import {
  isExportLedgersLoadingSelector,
  isImportLedgersLoadingSelector,
  isImportLedgersTemplateLoadingSelector,
} from '@/modules/Housing/redux/loading';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import LedgerModal from '../components/Ledger/LedgerModal';
import { resetSelectedLedgerAction, requestLedgersAsync } from '@/modules/Housing/redux/ledger';

const initialPageSize = 10;
const initialPage = 1;
const initialSearchText = '';
const initialSearchType = '';
const downloadOptions = [
  {
    format: 'csv',
    label: 'Download CSV',
    action: exportLedgersAsync.request,
  },
  {
    format: 'xlsx',
    label: 'Download Excel',
    action: exportLedgersAsync.request,
  },
  {
    format: 'csv',
    label: 'Download CSV Import Template',
    action: importLedgersTemplateAsync.request,
  },
  {
    format: 'xlsx',
    label: 'Download Excel Import Template',
    action: importLedgersTemplateAsync.request,
  },
];
const uploadOptions = [
  {
    format: 'csv',
    mimetype: 'text/csv,text/plain',
    label: 'Upload CSV',
  },
  {
    format: 'xlsx',
    mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    label: 'Upload Excel',
  },
];

const Ledger = ({
  archived,
  importLedgers,
  importLedgersLoading,
  exportLedgersLoading,
  importLedgersTemplateLoading,
  getLedgers,
  resetSelected,
}) => {
  const dispatch = useDispatch();
  const [selectedFileOption, setSelectedFileOption] = useState('');
  const [triggerUpload, setTriggerUpload] = useState(false);
  const fileInput = useRef();
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [searchText, setSearchText] = useState(initialSearchText);
  const [searchType, setSearchType] = useState(initialSearchType);
  const [isOpen, setIsOpen] = useState(false);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  useEffect(() => {
    if (triggerUpload) {
      fileInput?.current?.click();
      setTriggerUpload(false);
    }
  }, [triggerUpload]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    importLedgers({
      format: selectedFileOption?.format,
      file,
      successCallback: () => {
        getLedgers();
      },
    });
    event.target.value = null;
  };

  const handleUploadTypeChange = (option) => {
    setTriggerUpload(true);
    setSelectedFileOption(option);
  };

  const handleLedgerDownload = (option) => {
    if (option) {
      dispatch(option.action({ format: option.format }));
    }
  };

  const onLedgerModalClose = useCallback(() => {
    resetSelected();
    setIsOpen(false);
    getLedgers();
  }, [getLedgers, resetSelected]);

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-900 text-[32px] font-normal leading-10">
          {archived ? 'Ledger Archive' : 'Ledger records'}
        </span>
        <div className="justify-end items-center gap-4 inline-flex">
          <CustomButton
            color={'white'}
            onClick={() => setIsOpen(true)}
            className={'px-2 py-1 rounded-2xl border border-gray-200 justify-start flex gap-1 items-center focus:ring-0'}
          >
            <div className="text-right text-gray-900 text-xs font-normal font-['Inter'] leading-none">Add new Ledger
            </div>
          </CustomButton>
          {exportLedgersLoading || importLedgersTemplateLoading ? <Loader /> : (
            <DropdownButton
              color={'white'}
              options={downloadOptions}
              buttonClassName={'px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex'}
              label={downloadOptions[0].label}
              labelClassName={'text-right text-xs font-normal font-["Inter"] leading-none'}
              iconClassName={'w-3 h-3 relative'}
              onChange={handleLedgerDownload}
            />
          )}
          {importLedgersLoading ? <Loader /> : (
            <DropdownButton
              color={'white'}
              options={uploadOptions}
              buttonClassName={'px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex'}
              label={uploadOptions[0].label}
              labelClassName={'text-right text-xs font-normal font-["Inter"] leading-none'}
              iconClassName={'w-3 h-3 relative'}
              onChange={handleUploadTypeChange}
            />
          )}
          <input
            type="file"
            ref={fileInput}
            className="hidden"
            accept={selectedFileOption?.mimetype}
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <LedgersTable
        pageSize={pageSize}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        initialPage={initialPage}
        setPageSize={setPageSize}
        onPageChange={onPageChange}
        searchText={searchText}
        setSearchText={setSearchText}
        searchType={searchType}
        setSearchType={setSearchType}
        archived={archived}
        setIsModalOpen={setIsOpen}
      />
      <LedgerModal isOpen={isOpen} onClose={onLedgerModalClose} />
    </>
  );
};

const mapStateToProps = (state) => ({
  importLedgersLoading: isImportLedgersLoadingSelector(state),
  exportLedgersLoading: isExportLedgersLoadingSelector(state),
  importLedgersTemplateLoading: isImportLedgersTemplateLoadingSelector(state),
});

const mapDispatchToProps = {
  importLedgers: importLedgersAsync.request,
  getLedgers: requestLedgersAsync.request,
  resetSelected: resetSelectedLedgerAction,
};

Ledger.propTypes = {
  archived: PropTypes.bool,
  importLedgers: PropTypes.func,
  importLedgersLoading: PropTypes.bool,
  exportLedgersLoading: PropTypes.bool,
  importLedgersTemplateLoading: PropTypes.bool,
  getLedgers: PropTypes.func,
  resetSelected: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ledger);
