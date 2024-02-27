import { useState, useRef } from 'react';
import classNames from 'classnames';
import Button from '../Button';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
import FilterValueHeader from './FilterValueHeader';
import FilterValueFooter from './FilterValueFooter';
import { Icon } from '@/components/common/Icon';

const AddFilterButton = ({
  label,
  filters,
  setFilters,
  filterTypeOptions,
  filterValueOptions,
  buttonClassName,
  labelClassName,
}) => {
  const [isFilterTypeOpen, setIsFilterTypeOpen] = useState(false);
  const [isFilterValueOpen, setIsFilterValueOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState('');
  const isSelected = (filterValue) => {
    return !!selectedOptions.find((el) => JSON.stringify(el) === JSON.stringify(filterValue));
  };

  const onApplyClick = () => {
    setFilters([
      ...filters,
      { type: selectedFilterType, value: selectedOptions },
    ]);
    setSelectedOptions([]);
    setSelectedFilterType({});
    setIsFilterValueOpen(false);
  };

  const filteredOptions = filterValueOptions?.filter((option) =>
    option.name.toLowerCase().includes(filterOptions.toLowerCase())
  );

  const handleClickOutsideDropdownButton = () => {
    setIsFilterTypeOpen(false);
    setIsFilterValueOpen(false);
  };

  const ref = useRef();

  useOnClickOutside(ref, handleClickOutsideDropdownButton);

  return (
    <div className="relative">
      <Button
        id="dropdownButton"
        className={buttonClassName}
        onClick={() => setIsFilterTypeOpen(!isFilterTypeOpen)}
        data-dropdown-toggle="dropdown"
      >
        <div className={labelClassName}>{label || 'Select item'}</div>
      </Button>
      {isFilterTypeOpen && (
        <div
          id="dropdown"
          ref={ref}
          className="absolute right-0 z-10 w-44 text-base list-none bg-white rounded-lg shadow-md border border-gray-200"
        >
          <ul className="divide-y" aria-labelledby="dropdownButton">
            {filterTypeOptions.map(({ label, onClick, value, isHidden }, i) => {
              const onClickOption = () => {
                onClick();
                setIsFilterTypeOpen(false);
                setIsFilterValueOpen(true);
                setSelectedFilterType({'label':label, 'value':value});
              };
              return isHidden ? null : (
                <li key={i}>
                  <button
                    className="w-full py-2.5 px-4 text-sm text-gray-700 hover:bg-gray-200 font-['Inter'] font-normal leading-4 text-left"
                    onClick={onClickOption}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {isFilterValueOpen && (
        <div
          id="dropdown"
          ref={ref}
          className="absolute right-0 z-10 w-48 text-base list-none bg-white rounded-lg shadow-md border border-gray-200"
        >
          <FilterValueHeader setFilterOptions={setFilterOptions} />
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

AddFilterButton.propTypes = {
  filterTypeOptions: PropTypes.array,
  filterValueOptions: PropTypes.array,
  label: PropTypes.string,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  filters: PropTypes.array,
  setFilters: PropTypes.func,
};

AddFilterButton.defaultProps = {
  labelClassName:
    'text-gray-600 text-right font-normal sm:text-xs leading-none border-none shadow-none',
  buttonClassName: 'items-center',
};

export default AddFilterButton;
