import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import ApartmentFormWrapper from '../Modal/ApartmentFormWrapper';
import { CustomButtonGroup, CustomFormElement } from '@/components/common';
import { useFormActions, unitInformationValidationSchema } from '@/modules/Housing/modules/ApartmentSetup/lib/';
import {
  apartmentConstants,
  repTypeSelectOptions,
  apartmentTypeSelectOptions,
  defaultSelectOption,
  couchSelectOptions,
  apartmentSetupConstants,
} from '@/modules/Housing/lib';
import {
  apartmentDataSelector,
  unitInformationDataSelector,
} from '@/modules/Housing/redux/apartment';
import { dealersSelector, requestDealersAsync } from '@/modules/Housing/redux/partnership';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';
import RoomsField from './RoomsFields';

const {
  UNIT_INFO_FORM_TITLE,
  UNIT_ID_NAME,
  UNIT_REP_TYPE_NAME,
  UNIT_APARTMENT_TYPE_NAME,
  UNIT_HAS_COUCH_NAME,
  UNIT_STREET_ADDRESS_NAME,
  UNIT_NOTES_NAME,
  UNIT_ID_LABEL,
  UNIT_REP_TYPE_LABEL,
  UNIT_APARTMENT_TYPE_LABEL,
  UNIT_HAS_COUCH_LABEL,
  UNIT_STREET_ADDRESS_LABEL,
  UNIT_NOTES_LABEL,
  UNIT_INFORMATION_FORM_NAME,
} = apartmentConstants;

const {
  STATE_NAME,
  ZIP_NAME,
  CITY_NAME,
  CITY_LABEL,
  STATE_LABEL,
  ZIP_LABEL,
} = apartmentSetupConstants;

const UnitInformationForm = ({
  // Own Props
  complex,
  apartmentId,
  nextStep,
  onClose,

  // State / Dispatch
  isApartmentLoading,
  unitInformationData,
  dealers,
  selectedApartment,
}) => {
  const formRef = useRef(null);

  const {
    methods,
    handleSubmitForm,
    handleChange,
  } = useFormActions({
    validationSchema: unitInformationValidationSchema,
    formData: unitInformationData,
    nextStep,
    apartmentId,
    complexId: complex?.id,
    selected: selectedApartment,
    formDataName: UNIT_INFORMATION_FORM_NAME,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <ApartmentFormWrapper ref={formRef} step={1} title={UNIT_INFO_FORM_TITLE} isLoading={isApartmentLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm(onClose))}>
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <CustomFormElement
              id={UNIT_ID_NAME}
              name={UNIT_ID_NAME}
              label={UNIT_ID_LABEL}
              type="text"
              onChange={handleChange}
              register={register}
              error={errors?.[UNIT_ID_NAME]}
              required
            />
            <CustomFormElement
              id={UNIT_REP_TYPE_NAME}
              name={UNIT_REP_TYPE_NAME}
              label={UNIT_REP_TYPE_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...repTypeSelectOptions]}
              onChange={handleChange}
              register={register}
              error={errors?.[UNIT_REP_TYPE_NAME]}
              required
            />
            <CustomFormElement
              id={UNIT_APARTMENT_TYPE_NAME}
              name={UNIT_APARTMENT_TYPE_NAME}
              label={UNIT_APARTMENT_TYPE_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...apartmentTypeSelectOptions]}
              onChange={handleChange}
              register={register}
              error={errors?.[UNIT_APARTMENT_TYPE_NAME]}
            />
            <CustomFormElement
              id={UNIT_HAS_COUCH_NAME}
              name={UNIT_HAS_COUCH_NAME}
              label={UNIT_HAS_COUCH_LABEL}
              type="select"
              selectOptions={[...couchSelectOptions]}
              onChange={handleChange}
              register={register}
              error={errors?.[UNIT_HAS_COUCH_NAME]}
              required
            />
            <RoomsField handleChange={handleChange} />
            <CustomFormElement
              id={UNIT_STREET_ADDRESS_NAME}
              name={UNIT_STREET_ADDRESS_NAME}
              label={UNIT_STREET_ADDRESS_LABEL}
              type="text"
              onChange={handleChange}
              register={register}
              error={errors?.[UNIT_STREET_ADDRESS_NAME]}
            />
            <CustomFormElement
              id={CITY_NAME}
              name={CITY_NAME}
              label={CITY_LABEL}
              disabled={true}
              className="bg-gray-100"
              type="text"
              value={complex?.address?.city ?? ''}
            />
            <CustomFormElement
              id={STATE_NAME}
              name={STATE_NAME}
              label={STATE_LABEL}
              disabled={true}
              className="bg-gray-100"
              type="text"
              value={complex?.address?.state ?? ''}
            />
            <CustomFormElement
              id={ZIP_NAME}
              name={ZIP_NAME}
              label={ZIP_LABEL}
              disabled={true}
              className="bg-gray-100"
              type="text"
              value={complex?.address?.zip ?? ''}
            />
            <CustomFormElement
              colSpan={6}
              rows={4}
              id={UNIT_NOTES_NAME}
              name={UNIT_NOTES_NAME}
              label={UNIT_NOTES_LABEL}
              type="textArea"
              onChange={handleChange}
              register={register}
              error={errors?.[UNIT_NOTES_NAME]}
            />
          </div>

          <CustomButtonGroup
            orientation="right"
            onCancelClick={onClose}
            wrapperClassName="pt-6 pr-6"
            saveText="Submit"
            withSubmit
          />
        </form>
      </FormProvider>
    </ApartmentFormWrapper>
  );
};

UnitInformationForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  nextStep: PropTypes.object,
  onClose: PropTypes.func,
  isApartmentLoading: PropTypes.bool,
  unitInformationData: PropTypes.object,
  dealers: PropTypes.array,
  requestDealers: PropTypes.func,
  selectedApartment: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dealers: dealersSelector(state),
  isApartmentLoading: apartmentFormLoadingSelector(state),
  selectedApartment: apartmentDataSelector(state),
  unitInformationData: unitInformationDataSelector(state),
});

const mapDispatchToProps = {
  requestDealers: requestDealersAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitInformationForm);
