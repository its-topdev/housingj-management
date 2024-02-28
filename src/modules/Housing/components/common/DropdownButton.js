import React, { useState, useRef } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'
import { useOnClickOutside } from '@/hooks';

const DropdownButton = ({
  label,
  options,
  color,
  buttonClassName,
  labelClassName,
  iconClassName,
  onChange,
}) => {

  const [open, setOpen] = useState(false)

  const handleClickOutsideDropdownButton = () => {
    setOpen(false);
  }

  const ref = useRef();

  useOnClickOutside( ref, handleClickOutsideDropdownButton);

  return (
    <div>
      <Button id="dropdownButton"  className={buttonClassName} color={color} onClick={() => setOpen(!open)} data-dropdown-toggle="dropdown">
          <div className={labelClassName}>
            {label || 'Select item'}
          </div>
          <svg className={iconClassName ? iconClassName : "ml-2 w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
      </Button>

      {open &&
        <div id="dropdown" ref={ref} className="absolute z-10 w-44 text-base list-none bg-white rounded divide-y shadow-lg">
          <ul className="py-1 divide-y" aria-labelledby="dropdownButton">
            {options.map(({ label, isHidden, ...option }, i) => {
              const onClickOption = (event) => {
                onChange(option);
                setOpen(false);
              }

              return isHidden ? null : (
                <li key={i}>
                  <button
                    className="w-full py-2 px-4 text-sm hover:bg-gray-100 text-left"
                    onClick={onClickOption}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </div>
  )
}

DropdownButton.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  color: PropTypes.string,
  buttonClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
}

export default DropdownButton
