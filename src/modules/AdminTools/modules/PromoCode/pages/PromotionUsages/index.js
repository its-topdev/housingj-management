import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SettingDataTable from '@/modules/AdminTools/components/SettingDataTable';
import {
  createPromotionUsageAsync,
  promotionUsagesSelector,
  requestPromotionUsagesAsync,
} from '@/modules/AdminTools/redux/promoCode/promotionUsages';
import PromotionsSelect from './PromotionsSelect';
import ChannelsSelect from './ChannelsSelect';

const table = [
  // 'promotion_id' => 'required_without:code|exists:promotions,id',
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
  // 'sales_professional_id' => 'required',
  {
    label: 'Sales Professional Id',
    name: 'sales_professional_id',
    type: 'text',
    required: true,
  },
  // 'service_professional_id' => 'required',
  {
    label: 'Service Professional Id',
    name: 'service_professional_id',
    type: 'text',
    required: true,
  },
  // 'channel'
  {
    label: 'Channel',
    name: 'channel',
    CreateRender: ChannelsSelect,
  },
];

const fields = [
  // 'code' => 'required_without:promotion_id|exists:promotions,code',
  // {
  //   label: 'Code',
  //   name: 'code',
  //   type: 'text',
  //   required: true,
  // },
  ...table,
];

const sortOrders = ['created_at'];

const title = 'Promotion Usage';

const defaultValues = {
  service_professional_id: '',
  sales_professional_id: '',
  customer_id: '',
  channel: '',
  promotion_id: '',
};

const getSearchField = ({ customer_id }) => customer_id;

const searchPlaceholder = 'Search Customers';

const PromotionUsages = () => {
  const dispatch = useDispatch();
  const data = useSelector(promotionUsagesSelector);

  useEffect(() => {
    dispatch(requestPromotionUsagesAsync.request());
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
    dispatch(createPromotionUsageAsync.request(data));
  };

  return (
    <SettingDataTable
      data={data}
      headerOptions={{
        error: 'promotionUsagesUpdate',
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

export default PromotionUsages;
