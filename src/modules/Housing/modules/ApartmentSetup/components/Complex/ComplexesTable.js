import { Table } from '@/components';
import { connect } from 'react-redux';
import { complexesSelector, complexesTotalSelector, resetSelectedApartmentAction } from '@/modules/Housing/redux/apartment';
import { getComplexHeadRows, parseComplexRows } from '@/modules/Housing/modules/ApartmentSetup/lib';
import { useCallback, useState } from 'react';
import { ApartmentModal } from '@/modules/Housing/modules/ApartmentSetup/components/Apartment';
import { isComplexesLoadingSelector } from '@/modules/Housing/redux/loading';
import PropTypes from 'prop-types';

const ComplexesTable = ({
  // Own Props
  initialPage,
  pageSize,
  setPageSize,
  selectedPage,
  onPageChange,

  // State / Dispatch
  complexes,
  complexesTotal,
  getComplexes,
  isLoading,
  resetSelected,
}) => {
  const [apartmentOpen, setApartmentOpen] = useState(false);
  const [selectedComplex, setSelectedComplex] = useState();

  const onApartmentClick = useCallback((complex) => {
    setSelectedComplex(complex);
    setApartmentOpen(true);
  }, []);

  const onApartmentClose = useCallback(() => {
    resetSelected();
    setApartmentOpen(false);
    getComplexes();
  }, [getComplexes, resetSelected]);

  const complexRows = parseComplexRows(
    complexes ?? [],
    onApartmentClick,
  );

  return (
    <>
      <Table
        loading={isLoading}
        thead={{ rows: getComplexHeadRows() }}
        tbody={{
          rows: complexRows,
        }}
        paginator={{
          pageSize,
          setPageSize,
          onPageChange,
          selectedPage,
          initialPage,
          rowCount: complexesTotal,
        }}
        wrapper={{
          className: 'overflow-y-visible',
        }}
      />
      <ApartmentModal
        isOpen={apartmentOpen}
        complex={selectedComplex}
        onClose={onApartmentClose}
      />
    </>
  );
};

ComplexesTable.propTypes = {
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  selectedPage: PropTypes.number,
  complexes: PropTypes.array,
  complexesTotal: PropTypes.number,
  getComplexes: PropTypes.func,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  resetSelected: PropTypes.func,
};

const mapStateToProps = (state) => ({
  complexes: complexesSelector(state),
  complexesTotal: complexesTotalSelector(state),
  isLoading: isComplexesLoadingSelector(state),
});

const mapDispatchToProps = {
  resetSelected: resetSelectedApartmentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexesTable);
