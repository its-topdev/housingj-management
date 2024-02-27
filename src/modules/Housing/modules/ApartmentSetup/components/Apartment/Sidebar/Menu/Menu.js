import { memo } from 'react';
import { MenuItem } from '.';
import PropTypes from 'prop-types';

const callbackCache = {};

const Menu = ({
  items,
  currentStep,
  setCurrentStep,
  setNextStep,
}) => {
  const onItemClick = (id) => {
    const cached = callbackCache[id] = callbackCache[id] ?? {
      ref: null,
      callback: () => cached.ref(),
    };

    cached.ref = () => {
      const applyTransition = () => {
        setNextStep(null);
        setCurrentStep(id);
      };

      const declineTransition = () => {
        setNextStep(null);
      };

      setNextStep({ applyTransition, declineTransition });
    };

    return cached.callback;
  };

  return (
    <nav aria-label="Progress">
      <ol>
        {items.map(({
          id,
          path,
          label,
          completed,
        }) => (
          <MenuItem
            key={id}
            label={label}
            onClick={onItemClick(id, path)}
            selected={id === currentStep}
            completed={completed}
          />
        ))}
      </ol>
    </nav>
  );
};

Menu.propTypes = {
  items: PropTypes.array,
  currentStep: PropTypes.number,
  setCurrentStep: PropTypes.func,
  setNextStep: PropTypes.func,
};

export default memo(Menu);
