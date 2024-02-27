import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CustomButtonGroup,
  CustomFormElement,
  PageLoader,
  PhoneNumber,
  PostalCode,
} from '@/components/common';
import { apartmentSetupConstants, apartmentSetupSelectOptions, defaultSelectOption } from '@/modules/Housing/lib';
import { complexValidationSchema } from '../../lib/formValidations/complex';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { createApartmentComplexAsync } from '@/modules/Housing/redux/apartment';
import { teamsSummariesSelector, requestTeamsSummariesAsync } from '@/modules/Housing/redux/area';
import { dealersSelector, requestDealersAsync } from '@/modules/Housing/redux/partnership';
import { isTeamsSummariesLoadingSelector, isCreateComplexLoadingSelector } from '@/modules/Housing/redux/loading';

const {
  COMPLEX_NAME,
  DEALER_NAME,
  COMPLEX_TYPE_NAME,
  EMAIL_NAME,
  STATE_NAME,
  ZIP_NAME,
  CITY_NAME,
  PHONE_NAME,
  STREET_ADDRESS_NAME,
  CONTACT_PERSON_NAME,
  TEAMS_NAME,
  COMPLEX_LABEL,
  DEALER_LABEL,
  COMPLEX_TYPE_LABEL,
  EMAIL_LABEL,
  STATE_LABEL,
  ZIP_LABEL,
  CITY_LABEL,
  PHONE_LABEL,
  STREET_ADDRESS_LABEL,
  CONTACT_PERSON_LABEL,
  TEAMS_LABEL,
} = apartmentSetupConstants;

const AddComplexForm = ({
  teamsSummaries,
  dealers,
  getDealers,
  getTeamsSummaries,
  isTeamsLoading,
  createApartmentComplex,
  isCreateComplexLoading,
  onClose,
}) => {
  useEffect(() => {
    getDealers();
  }, [getDealers]);

  const methods = useForm({
    defaultValues: {
      [PHONE_NAME]: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(complexValidationSchema),
  });

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const selectedTeams = (getValues())[TEAMS_NAME];

  const onChangeHandler = useCallback((event) => {
    const { name, value } = event.target;

    setValue(name, value, { shouldValidate: true });
  }, [setValue]);

  const onDealerChangeHandler = useCallback(({ target: { value } }) => {
    setValue(TEAMS_NAME, [], { shouldValidate: true });
    setValue(DEALER_NAME, value, { shouldValidate: true });

    if (value) {
      getTeamsSummaries({ dealer_id: value });
    }
  }, [setValue]);

  const handleSubmitForm = useCallback(() => {
    createApartmentComplex({
      data: getValues(),
      successCallback: onClose,
    });
  }, [createApartmentComplex, getValues, onClose]);

  return (
    <div className="bg-gray-100 p-8">
      {isCreateComplexLoading && <PageLoader />}
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm())}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <CustomFormElement
              id={COMPLEX_NAME}
              name={COMPLEX_NAME}
              label={COMPLEX_LABEL}
              type="text"
              onChange={onChangeHandler}
              register={register}
              error={errors?.[COMPLEX_NAME]}
              required
            />
            <CustomFormElement
              id={COMPLEX_TYPE_NAME}
              name={COMPLEX_TYPE_NAME}
              label={COMPLEX_TYPE_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...apartmentSetupSelectOptions]}
              onChange={onChangeHandler}
              register={register}
              error={errors?.[COMPLEX_TYPE_NAME]}
              required
            />
            <CustomFormElement
              id={DEALER_NAME}
              name={DEALER_NAME}
              label={DEALER_LABEL}
              type="select"
              selectOptions={[...defaultSelectOption, ...dealers]}
              onChange={onDealerChangeHandler}
              register={register}
              error={errors?.[DEALER_NAME]}
              required
            />
            <CustomFormElement
              id={TEAMS_NAME}
              type="multiSelect"
              label={TEAMS_LABEL}
              name={TEAMS_NAME}
              isMulti={true}
              isLoading={isTeamsLoading}
              options={teamsSummaries ?? []}
              onChange={onChangeHandler}
              value={selectedTeams}
              error={errors?.[TEAMS_NAME]}
              required
            />
            <CustomFormElement
              id={EMAIL_NAME}
              name={EMAIL_NAME}
              label={EMAIL_LABEL}
              type="text"
              onChange={onChangeHandler}
              register={register}
              error={errors?.[EMAIL_NAME]}
              required
            />
            <CustomFormElement
              id={STREET_ADDRESS_NAME}
              name={STREET_ADDRESS_NAME}
              label={STREET_ADDRESS_LABEL}
              type="text"
              showYearDropdown
              onChange={onChangeHandler}
              register={register}
              error={errors?.[STREET_ADDRESS_NAME]}
              required
            />
            <CustomFormElement
              id={CITY_NAME}
              name={CITY_NAME}
              label={CITY_LABEL}
              type="text"
              showYearDropdown
              onChange={onChangeHandler}
              register={register}
              error={errors?.[CITY_NAME]}
              required
            />
            <CustomFormElement
              id={STATE_NAME}
              name={STATE_NAME}
              label={STATE_LABEL}
              type="text"
              showYearDropdown
              onChange={onChangeHandler}
              register={register}
              error={errors?.[STATE_NAME]}
              required
            />
            <PostalCode
              colSpan={3}
              id={ZIP_NAME}
              name={ZIP_NAME}
              label={ZIP_LABEL}
              onChange={onChangeHandler}
              register={register}
              error={errors?.[ZIP_NAME]}
              required
            />
            <PhoneNumber
              id={PHONE_NAME}
              name={PHONE_NAME}
              label={PHONE_LABEL}
              onChange={onChangeHandler}
              register={register}
              error={errors?.[PHONE_NAME]}
              required
            />
            <CustomFormElement
              id={CONTACT_PERSON_NAME}
              name={CONTACT_PERSON_NAME}
              label={CONTACT_PERSON_LABEL}
              type="text"
              onChange={onChangeHandler}
              register={register}
              error={errors?.[CONTACT_PERSON_NAME]}
              required
            />
          </div>

          <CustomButtonGroup
            orientation="right"
            onCancelClick={onClose}
            wrapperClassName="pt-6"
            withSubmit
          />
        </form>
      </FormProvider>
    </div>
  );
};

AddComplexForm.propTypes = {
  isTeamsLoading: PropTypes.bool,
  isCreateComplexLoading: PropTypes.bool,
  teamsSummaries: PropTypes.array,
  getTeamsSummaries: PropTypes.func,
  createApartmentComplex: PropTypes.func,
  onClose: PropTypes.func,
  dealers: PropTypes.array,
  getDealers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  teamsSummaries: teamsSummariesSelector(state),
  dealers: dealersSelector(state),
  isTeamsLoading: isTeamsSummariesLoadingSelector(state),
  isCreateComplexLoading: isCreateComplexLoadingSelector(state),
});

const mapDispatchToProps = {
  getTeamsSummaries: requestTeamsSummariesAsync.request,
  getDealers: requestDealersAsync.request,
  createApartmentComplex: createApartmentComplexAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplexForm);
