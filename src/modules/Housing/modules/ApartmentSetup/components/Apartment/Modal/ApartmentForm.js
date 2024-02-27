import { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { UnitInformationForm } from '../UnitInformation';
import { LeaseDetailsForm } from '../LeaseDetails';
import { MoveOutForm } from '../MoveOut';
import { FurnitureForm } from '../Furniture';
import { UtilitiesForm } from '../Utilities';
import { DocumentsUploadForm } from '../Documents';
import { apartmentMenuItems, apartmentConstants } from '@/modules/Housing/lib';
import PropTypes from 'prop-types';

const {
  UNIT_INFO_STEP_ID,
  FURNITURE_STEP_ID,
  UTILITIES_STEP_ID,
  LEASE_DETAILS_STEP_ID,
  MOVE_OUT_STEP_ID,
  DOCUMENTS_STEP_ID,
} = apartmentConstants;

const ApartmentForm = ({
  complex,
  apartmentId,
  onClose,
}) => {

  const [currentStep, setCurrentStep] = useState(1);
  const [nextStep, setNextStep] = useState();

  const getCurrentStepForm = (currentStep) => {
    switch (currentStep) {
      case UNIT_INFO_STEP_ID:
        return (
          <UnitInformationForm
            complex={complex}
            apartmentId={apartmentId}
            nextStep={nextStep}
            onClose={onClose}
          />
        );
      case FURNITURE_STEP_ID:
        return (
          <FurnitureForm
            complex={complex}
            apartmentId={apartmentId}
            nextStep={nextStep}
            onClose={onClose}
          />
        );
      case UTILITIES_STEP_ID:
        return (
          <UtilitiesForm
            complex={complex}
            apartmentId={apartmentId}
            nextStep={nextStep}
            onClose={onClose}
          />
        );
      case LEASE_DETAILS_STEP_ID:
        return (
          <LeaseDetailsForm
            complex={complex}
            apartmentId={apartmentId}
            nextStep={nextStep}
            onClose={onClose}
          />
        );
      case MOVE_OUT_STEP_ID:
        return (
          <MoveOutForm
            complex={complex}
            apartmentId={apartmentId}
            nextStep={nextStep}
            onClose={onClose}
          />
        );
      case DOCUMENTS_STEP_ID:
        return (
          <DocumentsUploadForm
            complex={complex}
            apartmentId={apartmentId}
            nextStep={nextStep}
            onClose={onClose}
          />
        );
      default:
        return (
          <UnitInformationForm
            complex={complex}
            apartmentId={apartmentId}
            nextStep={nextStep}
            onClose={onClose}
          />
        );
    }
  };

  return (
    <div className="flex flex-wrap bg-gray-100 w-screen max-w-5xl rounded overflow-hidden bg-white shadow-xl">
      <div className="w-full sm:w-1/4 p-4">
        <Sidebar
          menuItems={apartmentMenuItems}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setNextStep={setNextStep}
        />
      </div>
      <div className="w-full p-4 overflow-hidden sm:w-3/4 sm:h-70vh sm:overflow-y-scroll">
        {getCurrentStepForm(currentStep)}
      </div>
    </div>
  );
};

ApartmentForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  onClose: PropTypes.func,
};

export default ApartmentForm;
