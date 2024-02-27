import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Input from 'react-text-mask';

const MaskedInput = ({
  id,
  name,
  value,
  formValue,
  register,
  onChange,
  onBlur,
  baseClasses,
  className,
  required,
  disabled,
  autoComplete,
  placeholder,
  hasError,
  mask,
  guide,
}) => {
  const completeClassName = useMemo(() => mergeClassName(
    'shadow-sm block w-full sm:text-sm rounded-md',
    {
      [baseClasses?.errorClasses]: hasError,
      [baseClasses?.standardClasses]: !hasError,
    },
    className,
  ), [
    baseClasses,
    className,
    hasError,
  ]);

  const renderInput = (props) => (
    <Input
      id={id}
      name={name}
      type="text"
      className={completeClassName}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      placeholder={placeholder}
      mask={mask}
      guide={guide}
      aria-invalid={hasError}
      {...props}
    />
  );

  const renderController = () => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        renderInput({
          value: field.value,
          onChange: field.onChange,
          onBlur: field.onBlur,
          ...(onChange && { onChange }),
          ...(onBlur && { onBlur }),
        })
      )}
    />
  );

  const renderControlled = () => {
    const { ref: {}, ...rest } = register?.(name) ?? {};

    return renderInput({
      value: register ? formValue : value,
      ...rest,
      ...(onChange && { onChange }),
      ...(onBlur && { onBlur }),
    });
  };

  const { control } = useFormContext() ?? {};

  return control
    ? renderController()
    : renderControlled();
};

MaskedInput.defaultProps = {
  guide: false,
};

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  guide: PropTypes.bool,
};

export default MaskedInput;
