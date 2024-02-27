import { useCallback } from 'react';
import { CustomFormElement } from '.';

const DriverLicenseNumber = (props) => {
  const mask = useCallback((value) => {
    const MIN_LENGTH = 2;
    const MAX_LENGTH = 20;
    const mask = [/\S/, /\S/];
    const length = value.replace(/\s/g, '').length;

    if (length <= MIN_LENGTH) {
      return mask;
    }

    for (let i = MIN_LENGTH; i < Math.min(length, MAX_LENGTH); i++) {
      mask.push(/\S/);
    }

    return mask;
  }, []);

  return (
    <CustomFormElement
      {...props}
      type="masked"
      mask={mask}
    />
  );
};

export default DriverLicenseNumber;
