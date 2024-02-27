import { addFsExcludeClass, arrayWithoutEmpty } from '@/lib/utils';
import { AddApartmentButton } from '@/modules/Housing/modules/ApartmentSetup/components';
import { housingConstants } from '@/modules/Housing/lib/constants';

export const getComplexHeadRows = () => (
  arrayWithoutEmpty([
    {
      value: 'id',
      align: 'center',
    },
    {
      value: 'name',
      align: 'center',
    },
    {
      value: '',
      align: 'center',
    },
  ])
);

export const parseComplexRows = (rows, onAddApartmentClick) => (
  rows.length ? rows.map((row) => {
    const { id, name } = row ?? {};

    return [
      {
        value: id,
        align: 'center',
        className: 'px-2',
      },
      {
        value: name || '-',
        align: 'center',
        className: 'px-2',
      },
      {
        value: (
          <AddApartmentButton onClick={() => onAddApartmentClick(row)} />
        ),
        align: 'center',
        className: addFsExcludeClass('px-2'),
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
