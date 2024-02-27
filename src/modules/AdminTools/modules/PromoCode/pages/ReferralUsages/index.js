import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SettingDataTable from '@/modules/AdminTools/components/SettingDataTable';
import {
  createReferralUsageAsync,
  referralUsagesSelector,
  requestReferralUsagesAsync,
} from '@/modules/AdminTools/redux/promoCode/referralUsages';
import PromotionsSelect from './PromotionsSelect';

const table = [
  // 'promotion_id' => 'required_without:code|exists:referrals,id',
  {
    label: 'Promotion',
    name: 'promotion_id',
    CreateRender: PromotionsSelect,
  },
  // 'customer_id' => 'required',
  {
    label: 'Customer Id',
    name: 'customer_id',
    type: 'text',
    required: true,
  },
  // 'referring_customer_id' => 'required',
  {
    label: 'Referring Customer Id',
    name: 'referring_customer_id',
    type: 'text',
    required: true,
  },
  // 'referring_employee_id' => 'required',
  {
    label: 'Referring Employee Id',
    name: 'referring_employee_id',
    type: 'text',
    required: true,
  },
  // 'code_used' => 'required',
  {
    label: 'Code Used',
    name: 'code_used',
    type: 'text',
    required: true,
  },
];

const fields = [
  // 'code' => 'required_without:promotion_id|exists:referrals,code',
  // {
  //   label: 'Code',
  //   name: 'code',
  //   type: 'text',
  //   required: true,
  // },
  ...table,
];

const sortOrders = ['created_at'];

const title = 'Referral Usage';

const defaultValues = {
  service_professional_id: '',
  sales_professional_id: '',
  customer_id: '',
  channel: '',
  promotion_id: '',
};

const getSearchField = ({ customer_id }) => customer_id;

const searchPlaceholder = 'Search Customers';

const ReferralUsages = () => {
  const dispatch = useDispatch();
  const data = useSelector(referralUsagesSelector);

  useEffect(() => {
    dispatch(requestReferralUsagesAsync.request());
  }, [dispatch]);

  const indexMap = useMemo(() => {
    const map = {};

    data.forEach(({ id }, index) => {
      map[id] = index;
    });

    return map;
  }, [data]);

  const rowMap = useCallback(
    (data) => ({
      data,
      index: indexMap[data.id],
    }),
    [indexMap]
  );

  const renderTable = useMemo(
    () =>
      table.map((field) => {
        return {
          ...field,
          sortBy: field.name,
          render: ({ index }) => data[index][field.name],
        };
      }),
    [data]
  );

  const onCreate = (data) => {
    dispatch(createReferralUsageAsync.request(data));
  };

  return (
    <SettingDataTable
      data={data}
      headerOptions={{
        error: 'referralUsagesUpdate',
        title,
        defaultValues,
        onCreate,
        fields,
      }}
      tableOptions={{
        getSearchField,
        searchPlaceholder,
        sortOrders,
        rowMap,
        table: renderTable,
      }}
    />
  );
};

export default ReferralUsages;
