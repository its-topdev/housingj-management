import { useMemo } from 'react';
import classNames from 'classnames';

const CustomInput = ({
  id,
  name,
  type,
  disabled,
  formValue,
  value,
  hasError,
  max,
  className,
  onChange,
  register,
  childOrientation,
  ariaDescribedBy,
  placeholder,
  autoComplete,
  baseClasses,
  children,
  onBlur,
  required,
  ...props
}) => {
  const classes = useMemo(() => {
    const base =
      type !== 'checkbox'
        ? baseClasses?.[hasError ? 'errorClasses' : 'standardClasses'] || ''
        : '';

    return classNames(
      'shadow-sm block w-full sm:text-sm rounded-md',
      base,
      className,
      { 'text-gray-400': disabled },
    );
  }, [hasError, className, baseClasses, type]);

  return (
    <div className="flex">
      {childOrientation === 'left' ? children : null}
      <input
        {...(register && { ...register(name) })}
        id={id}
        max={max}
        name={name}
        type={type}
        value={register ? formValue : value}
        className={classes}
        {...(onChange && { onChange })}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
        autoComplete={autoComplete}
        {...(onBlur && { onBlur })}
        required={required || false}
        {...props}
      />
      {childOrientation === 'right' ? children : null}
    </div>
  );
};

/**
 * Warning!
 *
 * Don't use `React.memo()` in order to optimize the form component in conjunction with React Hook Form.
 *
 * The `reset()` function from the `useForm()` won't reset the value of the DOM input element during the form reset process.
 * It instead assumes that the component will be re-rendered and a correct value will be set during DOM input element registration.
 */
export default CustomInput;
