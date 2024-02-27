import PropTypes from 'prop-types';
import { Props } from '.';

const TableCell = ({
  value,
  type: Tag,
  align,
  valign,
  ...props
}) => (
  <Tag {...(
    new Props(props)
      // Because Tailwind can't handle dynamic values,
      // we have to list all possible `text-*` and `align-*` classes here.
      // The final value will override them.
      .withClassName([
        'px-4 py-4',
        `text-left text-center text-right text-${align}`,
        `align-top align-middle align-bottom align-${valign}`,
      ])
  )}>
    {value}
  </Tag>
);

TableCell.defaultProps = {
  type: 'td',
  align: 'left',
  valign: 'middle',
};

TableCell.propTypes = {
  value: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['td', 'th']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  valign: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

export default TableCell;
