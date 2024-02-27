import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { deleteLeadEmailAsync } from '../../../redux/leads'
import {
  deleteLeadEmailLoadingSelector,
} from '../../../redux/loading';
import { Button, Loader } from '@/components/common'
import { ConfirmationModal } from '@/components';
import { usersManagementConstants } from '../../../lib/constants';

const {
  DELETE_LEAD_BUTTON,
  DELETE_LEAD_CONFIRMATION_TITLE,
} = usersManagementConstants;

const LeadActionButton = ({
  isEmailDeleted,
  onActionCompleted,
  leadId,
  className,
  deleteLead,
  loading,
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const onConfirmationQuit = () => {
    setConfirmationOpen(false);

    if (leadId) {
      deleteLead({
        leadId,
        callback: () => onActionCompleted(),
      });
    }
  };

  const onConfirmationBack = () => {
    setConfirmationOpen(false);
  };

  const onDeleteUserClick = useCallback(() => {
    setConfirmationOpen(true);
  }, []);

  return (
    <>
      {loading
        ? <Loader className="h-[22px] leading-[26px]" />
        :
        <>
          <Button
            className={className}
            onClick={onDeleteUserClick}
            color="red"
            disabled={isEmailDeleted}
          >
            {DELETE_LEAD_BUTTON}
          </Button>
          <ConfirmationModal
            isOpened={confirmationOpen}
            modalWidth="max-w-[592px] w-full"
            onCancel={onConfirmationBack}
            onAction={onConfirmationQuit}
            title={DELETE_LEAD_CONFIRMATION_TITLE}
            cancelLabel="Go back"
            confirmLabel={DELETE_LEAD_BUTTON}
          />
        </>
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: deleteLeadEmailLoadingSelector(state),
  }
};

const mapDispatchToProps = {
  deleteLead: deleteLeadEmailAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadActionButton);
