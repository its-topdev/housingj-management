import { CustomButton, ModalWrapper } from '@/components';
import AddComplexForm from './AddComplexForm';
import { useState } from 'react';
import { CloseIconButton } from '@/components/common';

const AddComplex = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <div className="inline-block pb-4" onClick={() => setIsOpen(true)}>
        <CustomButton color={'green'}>Add Complex</CustomButton>
      </div>
      <ModalWrapper
        isOpened={isOpen}
        onCloseModal={onClose}
        width="max-w-[750px] w-full"
      >
        <div className="px-6 py-6 border-b border-gray-200 flex justify-between">
          <h2 className="text-lg font-bold text-aptivegreen">Add Complex</h2>
          <CloseIconButton
            onClose={onClose}
            classes="w-7 h-7 text-gray-400 hover:text-gray-500 focus:outline-aptivegreen p-0"
          />
        </div>
        <AddComplexForm onClose={onClose} />
      </ModalWrapper>
    </>
  );
};

export default AddComplex;
