import PropTypes from 'prop-types';
import { memo } from 'react';
import { Menu } from '.';

const Sidebar = ({
  menuItems,
  currentStep,
  setCurrentStep,
  setNextStep,
}) => {
  return (
    <Menu
      items={menuItems}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setNextStep={setNextStep}
    />
  );
};

Sidebar.propTypes = {
  menuItems: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
};

export default memo(Sidebar);
