import { ComplexesTable, AddComplex } from '../components/Complex';
import { useCallback, useEffect, useState } from 'react';
import { requestComplexesAsync } from '@/modules/Housing/redux/apartment';
import { useDispatch } from 'react-redux';

const initialPageSize = 10;
const initialPage = 1;

const ApartmentSetup = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const getComplexes = useCallback(() => {
    const params = {
      page: {
        number: selectedPage,
        size: pageSize,
      },
    };

    dispatch(requestComplexesAsync.request(params));
  }, [dispatch, pageSize, selectedPage]);

  useEffect(() => {
    getComplexes();
  }, [getComplexes, selectedPage, pageSize]);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  return (
    <>
      <AddComplex />
      <ComplexesTable
        pageSize={pageSize}
        selectedPage={selectedPage}
        initialPage={initialPage}
        setPageSize={setPageSize}
        onPageChange={onPageChange}
        getComplexes={getComplexes}
      />
    </>
  );
};

export default ApartmentSetup;
