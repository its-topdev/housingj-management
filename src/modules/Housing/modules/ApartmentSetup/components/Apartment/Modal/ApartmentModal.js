import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { ModalWrapper } from '@/components';
import { default as ApartmentForm } from './ApartmentForm';

const ApartmentModal = ({
  // Own Props
  isOpen,
  onClose,
  apartmentId,
  complex,
}) => {
  const cancelButtonRef = useRef(null);

  const onCloseModal = useCallback(() => {
    onClose();
  }, [
    onClose,
  ]);

  return (
    <ModalWrapper
      isOpened={isOpen}
      onCloseModal={onCloseModal}
    >
      <div className="w-full p-8 border-b border-gray-200 sm:px-6">
        <button
          type="button"
          className="px-5 py-5 absolute text-black right-0 top-0 rounded-tr-lg hover:text-gray-600 focus:outline-none"
          onClick={onCloseModal}
          ref={cancelButtonRef}
        >
          <XIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
      <ApartmentForm
        apartmentId={apartmentId}
        complex={complex}
        onClose={onCloseModal}
      />
    </ModalWrapper>
  );
};

ApartmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  apartmentId: PropTypes.number,
  complex: PropTypes.object,
};

export default ApartmentModal;
