import { useState, useRef } from 'react';
import classNames from 'classnames';
import Button from '../Button';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
import FilterValueHeader from './FilterValueHeader';
import FilterValueFooter from './FilterValueFooter';
import { Icon } from '@/components/common/Icon';

const FilterDropdownButton = ({
  filters,
  setFilters,
  index,
  filterValueOptions,
  buttonClassName,
  labelClassName,
  iconClassName,
}) => {
  const [isFilterValueOpen, setIsFilterValueOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    filters[index]?.value || []
  );
  const [filterOptions, setFilterOptions] = useState('');

  const isSelected = (filterValue) => {
    return !!selectedOptions.find((el) => JSON.stringify(el) === JSON.stringify(filterValue));
  };

  const onApplyClick = () => {
    const newFilters = [...filters];
    if (selectedOptions.length === 0) {
      newFilters.splice(index, 1);
    }
    else newFilters[index].value = selectedOptions;
    setFilters(newFilters);
    setIsFilterValueOpen(false);
  };

  const handleOnClickDelete = () => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
    setIsFilterValueOpen(false);
  };

  const filteredOptions = filterValueOptions?.filter((option) =>
    option.name.toLowerCase().includes(filterOptions.toLowerCase())
  );

  const handleClickOutsideDropdownButton = () => {
    setIsFilterValueOpen(false);
  };

  const ref = useRef();

  useOnClickOutside(ref, handleClickOutsideDropdownButton);

  return (
    <div className="relative">
      <Button
        id="dropdownButton"
        className={buttonClassName}
        onClick={() => setIsFilterValueOpen(!isFilterValueOpen)}
        data-dropdown-toggle="dropdown"
      >
        <div className={labelClassName}>
          {filters[index]?.type.label + ': ' + filters[index]?.value[0].label}
        </div>
        <svg
          className={iconClassName ? iconClassName : 'ml-2 w-4 h-4'}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>
      {isFilterValueOpen && (
        <div
          id="dropdown"
          ref={ref}
          className="absolute right-0 z-10 w-44 text-base list-none bg-white rounded-lg shadow-md border border-gray-200"
        >
          <FilterValueHeader
            setFilterOptions={setFilterOptions}
            onClickDelete={handleOnClickDelete}
          />
          <ul
            className="divide-y max-h-52 overflow-y-auto"
            aria-labelledby="dropdownButton"
          >
            {filterValueOptions &&
              filteredOptions.map(({ name, value }, i) => (
                <li key={i}>
                  <div className="flex py-2.5 gap-3">
                    <div
                      onClick={
                        selectedOptions.some((option) => JSON.stringify(option) === JSON.stringify({'label':name, 'value':value}))
                          ? () =>
                              setSelectedOptions(
                                selectedOptions.filter((el) => JSON.stringify(el) !== JSON.stringify({'label':name, 'value':value}))
                              )
                          : () => setSelectedOptions([...selectedOptions, {'label':name, 'value':value}])
                      }
                      className={classNames(
                        isSelected({'label':name, 'value':value}) ? 'text-white' : 'text-aptiveblue',
                        'inset-y-0 flex items-center pl-4'
                      )}
                    >
                      {isSelected({'label':name, 'value':value}) ? (
                        <Icon
                          icon="checkBoxSelected"
                          className="w-4 h-4 text-aptiveblue inline"
                        />
                      ) : (
                        <Icon
                          icon="checkBoxUnselected"
                          className="w-4 h-4 text-gray-600 inline"
                        />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 font-['Inter'] font-normal leading-4 text-left">
                      {name}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <FilterValueFooter
            onCancelClick={() => setIsFilterValueOpen(false)}
            onApplyClick={onApplyClick}
          />
        </div>
      )}
    </div>
  );
};

FilterDropdownButton.propTypes = {
  filters: PropTypes.array,
  setFilters: PropTypes.func,
  index: PropTypes.number,
  filterValueOptions: PropTypes.array,
  label: PropTypes.string,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
};

FilterDropdownButton.defaultProps = {
  filterValueOptions: [
    {
      name: 'Option 1',
    },
    {
      name: 'Option 2',
    },
  ],
  labelClassName:
    'text-gray-600 text-right font-normal sm:text-xs leading-none border-none shadow-none',
  buttonClassName: 'items-center',
};

export default FilterDropdownButton;
