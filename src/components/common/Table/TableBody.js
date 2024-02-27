import PropTypes from 'prop-types';
import { normalizeRows, Props, TableRow, TableCell } from '.';

const TableBody = ({
  rows,
  data,
  onSelect,
  classNames,
  ...props
}) => (
  <tbody {...(new Props(props).withClassName('divide-y'))}>
    {normalizeRows(rows).map(({ cells, ...props }, index) => (
      // The `key` attribute implicitly sets by Props.withKey() call.
      // eslint-disable-next-line react/jsx-key
      <TableRow
        {...(
          new Props(props)
          .withKey()
          .withClassName('text-gray-600 text-sm')
          .withClassName(classNames)
        )}  
        onClick={onSelect ? () => onSelect(data[index]) : undefined}
      >
        {cells.map(({ ...props }) => (
          // The `key` attribute implicitly sets by Props.withKey() call.
          // eslint-disable-next-line react/jsx-key
          <TableCell {...(new Props(props).withKey())} />
        ))}
      </TableRow>
    ))}
  </tbody>
);

TableBody.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
  classNames: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default TableBody;
