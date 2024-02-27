import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';

const PercentageThreshold = () => {
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="number"
      name="area_data.can_sell_percentage_threshold"
      label="Percentage Threshold"
      step={0.01}
      min={0}
      required
    />
  );
};

export default PercentageThreshold;
