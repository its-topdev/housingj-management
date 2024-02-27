import { arrayWithoutEmpty } from '@/lib/utils';
import { housingConstants } from '@/modules/Housing/lib/constants';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Icon } from '@/components/common';

const formatStringToCurrency = (number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const formatted = formatter.format(number);

  return formatted;
}

export const getLedgerHeadRows = () => (
  arrayWithoutEmpty([
    {
      value: 'PAID',
      align: 'center',
    },
    {
      value: 'LEDGER ID',
      align: 'center',
    },
    {
      value: 'VENDOR #',
      align: 'center',
    },
    {
      value: 'UNIT ID',
      align: 'center',
    },
    {
      value: 'AMOUNT TO PAY',
      align: 'center',
    },
    {
      value: 'DUE DATE',
      align: 'center',
    },
    {
      value: 'PAYEE',
      align: 'center',
    },
    {
      value: 'AMOUNT PAID',
      align: 'center',
    },
    {
      value: 'DATE PAID',
      align: 'center',
    },
    {
      value: 'EXPECTED RENT',
      align: 'center',
    },
    {
      value: 'BRANCH',
      align: 'center',
    },
    {
      value: 'SALES TEAM',
      align: 'center',
    },
    {
      value: 'DEALER',
      align: 'center',
    },
    {
      value: 'PARTNERSHIP',
      align: 'center',
    },
    {
      value: 'COMPLEX',
      align: 'center',
    },
    {
      value: 'TYPE OF PAYMENT',
      align: 'center',
    },
    {
      value: 'PAYMENT METHOD A/B',
      align: 'center',
    },
    {
      value: 'DAMAGES',
      align: 'center',
    },
    {
      value: 'REP UTILITES',
      align: 'center',
    },
    {
      value: 'CHARGES',
      align: 'center',
    },
    {
      value: 'DEDUCTIONS',
      align: 'center',
    },
    {
      value: '',
      align: 'center',
    },
  ])
);

export const parseLedgerRows = (rows, archived, onClickArchive) => (
  rows.length ? rows.map((row) => {
    const {
      pay_status_name,
      id,
      vendor_number,
      unit_id,
      amount_to_pay,
      date_due,
      payee,
      amount_paid,
      date_paid,
      expected_rent,
      branch_name,
      team_name,
      dealer_name,
      partnership_name,
      complex_name,
      payment_type_name,
      payment_method_name,
      furniture_damaged,
      rep_utilities,
      apartment_charges,
      apartment_deduction,
    } = row ?? {};

    return [
      {
        value: (pay_status_name && pay_status_name !== 'Not paid' ? pay_status_name : (<div className="text-red-500">Not paid</div>)),
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: id,
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: vendor_number,
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: unit_id,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: formatStringToCurrency(amount_to_pay),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: date_due,
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: payee,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: formatStringToCurrency(amount_paid),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: date_paid,
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatStringToCurrency(expected_rent),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: branch_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: team_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: dealer_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: partnership_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: complex_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: payment_type_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: payment_method_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: formatStringToCurrency(furniture_damaged),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatStringToCurrency(rep_utilities),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatStringToCurrency(apartment_charges),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatStringToCurrency(apartment_deduction),
        align: 'right',
        className:  'whitespace-nowrap text-red-500',
      },
      {
        value: (<PencilAltIcon className="w-5 h-5 relative text-gray-400" />),
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: (
          <Icon className="w-5 h-5 relative text-gray-600 font-thin cursor-pointer"
                icon={archived ? 'unArchiveIcon' : 'archiveIcon'}
                onClick={() => onClickArchive(id)} />
        ),
        align: 'center',
        className: 'whitespace-nowrap',
      },
    ];
  }) : [
    {
      value: housingConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ]
);

export const getLedgerHistoryHeadRows = () => (
  arrayWithoutEmpty([
    {
      value: 'ITEM CHANGED',
      align: 'center',
    },
    {
      value: 'CHANGED FROM',
      align: 'center',
    },
    {
      value: 'CHANGED TO',
      align: 'center',
    },
    {
      value: 'CHANGED BY',
      align: 'center',
    },
    {
      value: 'CHANGING DATE',
      align: 'center',
    },
  ])
);

export const parseLedgerHistoryRows = (rows) => (
  rows.length ? rows.map((row) => {
    const {
      changed_from,
      changed_to,
      field_name,
      changed_by_name,
      changed_at,
    } = row ?? {};

    return [
      {
        value: field_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: changed_from,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: changed_to,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: changed_by_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: changed_at,
        align: 'right',
        className: 'whitespace-nowrap',
      },
    ];
  }) : [
    {
      value: housingConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ]
);

export const parseFilter = (filters) => {
  const transformedFilter = filters.map((filter) => {
    const type = filter.type.value;
    const value = filter.value.map((el) => el.value);
    return {'type': type, 'value': value };
  });

  const mergedFilter = transformedFilter.reduce((acc, filter) => {
    const index = acc.findIndex((el) => el.type === filter.type);
    if (index > -1) {
      acc[index].value = [...new Set([...acc[index].value, filter.value])];
      return acc;
    } else {
      return [...acc, filter];
    }
  }, []);

  const parsedFilter = {};
  mergedFilter.forEach((filter) => {
    parsedFilter[filter.type] = filter.value;
  })
  return parsedFilter;
}
