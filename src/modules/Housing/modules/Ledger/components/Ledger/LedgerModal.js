import { ModalWrapper } from '@/components';
import LedgerForm from './LedgerForm';

const LedgerModal = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper
      isOpened={isOpen}
      onCloseModal={onClose}
    >
      <LedgerForm onClose={onClose}/>
    </ModalWrapper>
  );
};

export default LedgerModal;
