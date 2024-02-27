import PropTypes from 'prop-types';
import { useEffect, useCallback, useState, useMemo } from 'react';
import {
  dashboardConstants,
  format,
  formatDate,
  formatPhone,
  onboardingConstants,
} from '@/lib';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/modules/recruits/forms/GeneralInfo/GeneralInfoValidationSchema';
import { CustomFormElement, ErrorBox, DateOfBirth, PhoneNumber } from '@/components/common';
import { connect } from 'react-redux';
import { adminUpdateRepAsync } from '@/redux/reps';
import { updateRepErrorsSelector } from '@/redux/errors';
import { recruiterManagersLoadingSelector } from '@/redux/loading';
import {
  requestRecruitersAsync,
  requestRecruitingOfficesAsync,
  requestRecruiterManagersAsync,
  selectRecruiters,
  selectRecruitingOffices,
} from '@/redux/recruiters';
import { v4 as uuidv4 } from 'uuid';
import { addFsExcludeClass } from '@/lib/utils';
import { parseRepExperiences } from '@/lib/normalize';
import ExperienceList from '@/modules/recruits/components/LicensingInfo/RepExperience/ExperienceList';
import { getLeadExperienceFields } from '@/modules/dashboard/lib/configs';
import { adapterMapModified } from '@/lib/adapters';

const {
  GENERAL_INFO,
  LAST_4_OF_SOCIALS_LABEL,
  EMAIL_NAME,
  SSN_LAST_FOUR_NAME,
  EMAIL_LABEL,
  SELECT_RECRUITER_LABEL,
  PARTNERSHIP,
  REGIONAL_MANAGER,
  DIVISION_MANAGER,
  SENIOR_TEAM_LEADER,
  RECRUITING_OFFICE_LABEL,
  RECRUITER_NAME,
  RECRUITING_OFFICE_NAME,
} = dashboardConstants;

const {
  FIRST_NAME,
  FIRST_NAME_LABEL,
  LAST_NAME,
  LAST_NAME_LABEL,
  DATE_OF_BIRTH,
  DATE_OF_BIRTH_LABEL,
  PHONE_NUMBER_LABEL,
  PHONE_NAME,
  USER_TYPE,

  HAS_REP_EXPERIENCE,
  REP_EXPERIENCES_DATA_NAME,
} = onboardingConstants;

const GeneralInfo = ({
  // Own Props
  recruit,
  // State
  formErrors,
  recruiters,
  recruitingOffices,
  recruiterManagersIsLoading,
  // Dispatch
  updateRep,
  requestRecruiters,
  requestRecruitingOffices,
  requestRecruiterManagers,
}) => {
  const [generalInfo, setGeneralInfo] = useState({
    [FIRST_NAME]: recruit?.first_name || '',
    [LAST_NAME]: recruit?.last_name || '',
    [DATE_OF_BIRTH]: recruit?.dob ? formatDate(recruit.dob) : '',
    [EMAIL_NAME]: recruit?.email || '',
    [PHONE_NAME]: recruit?.mobile ? formatPhone(recruit?.mobile) : '',
    [SSN_LAST_FOUR_NAME]: recruit?.ss_last_four || '',
    [RECRUITER_NAME]: recruit?.recruiter_id,
    [RECRUITING_OFFICE_NAME]: recruit?.recruiting_office_id,
    [HAS_REP_EXPERIENCE]: (recruit?.['is_switchover'] || [0, 1].includes(recruit?.['is_switchover']))
      ? recruit['is_switchover'].toString()
      : '',
    [REP_EXPERIENCES_DATA_NAME]: recruit?.['experiences']
      ? parseRepExperiences(recruit['experiences'])
      : [],
  });

  const isUser = recruit.recruit_type === USER_TYPE;

  const methods = useForm({
    defaultValues: {
      ...generalInfo,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    context: { isUser, isExperienceRequired: true },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = methods;

  const recruiterRecruitingOffices = useMemo(
    () => {
      const selectedRecruiter = recruiters.find((rec) => rec.value === generalInfo[RECRUITER_NAME]);

      return selectedRecruiter ?
        recruitingOffices.filter((office) => office.dealerId === selectedRecruiter.dealerId) :
        recruitingOffices;
    },
    [generalInfo?.[RECRUITER_NAME], recruiters, recruitingOffices],
  );

  const handleSubmitForm = useCallback(() => {
    const sendingData = adapterMapModified['combined'](getValues());
    updateRep({
      id: recruit.id,
      ...sendingData,
    });
  }, [recruit.id, updateRep, getValues]);

  const onChangeHandler = useCallback((event) => {
    const { name, value, type } = event.target;
    const formatted = format(name, type, value);

    setValue(name, value, { shouldValidate: true });
    setGeneralInfo((previous) => ({
      ...previous,
      [name]: formatted,
    }));
  }, [setValue]);

  useEffect(() => {
    if (recruiters?.length === 0) {
      requestRecruiters();
      requestRecruitingOffices();
    }
  }, [
    recruiters?.length,
    requestRecruiters,
    requestRecruitingOffices,
  ]);

  // Load managers for the selected recruiter if they haven't loaded yet
  useEffect(() => {
    const {
      value: recruiterId,
      managers,
      dealerId: recruiterDealerId,
    } = recruiters.find((rec) => rec.value === generalInfo?.[RECRUITER_NAME]) ?? {};
    const office = recruitingOffices.find((rec) => rec.value === generalInfo?.[RECRUITING_OFFICE_NAME]);

    if (recruiterId && !managers) {
      requestRecruiterManagers({ recruiterId });
    }

    if (recruiterDealerId !== office?.dealerId) {
      setValue(RECRUITING_OFFICE_NAME, '', { shouldValidate: true });
      setGeneralInfo((prevGeneralInfo) => ({
        ...prevGeneralInfo,
        [RECRUITING_OFFICE_NAME]: '',
      }));
    }
  }, [
    generalInfo?.[RECRUITER_NAME],
    recruiters,
    requestRecruiterManagers,
  ]);

  // Update managers for the selected recruiter once they've loaded
  useEffect(() => {
    const {
      managers,
    } = recruiters.find((rec) => rec.value === generalInfo?.[RECRUITER_NAME]) ?? {};

    if (!managers) {
      return;
    }

    setGeneralInfo((previous) => ({
      ...previous,
      senior_team_leader: managers.senior_team_leader?.name ?? '',
      division_manager: managers.division_manager?.name ?? '',
      regional_manager: managers.regional_manager?.name ?? '',
      partnership: managers.partnership?.name ?? '',
    }));
  }, [
    generalInfo?.[RECRUITER_NAME],
    recruiters,
  ]);

  const errorRows = useMemo(() => {
    return formErrors?.length ? formErrors.map((error) => (
      <ErrorBox message={error.message} key={uuidv4()} />
    )) : [];
  }, [formErrors]);

  return (
    <div className="flex-1 px-6 py-5 bg-gray-100 border-b border-gray-200 sm:px-6">
      <div className="mt-2 bg-white shadow sm:rounded-md">
        <div className="flex items-center justify-between px-4 py-3 border-b sm:px-6">
          <h3 className="text-sm font-medium leading-6 text-gray-900 ">
            {GENERAL_INFO}
          </h3>
        </div>

        <div>
          {errorRows?.length > 0 && <>{errorRows}</>}
          <FormProvider {...methods}>
            <form noValidate className="px-6 pb-6 w-full grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6" onSubmit={handleSubmit(handleSubmitForm)}>
              <CustomFormElement
                colSpan={3}
                id={FIRST_NAME}
                name={FIRST_NAME}
                label={FIRST_NAME_LABEL}
                type="text"
                formValue={generalInfo?.[FIRST_NAME]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[FIRST_NAME]}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id={LAST_NAME}
                name={LAST_NAME}
                label={LAST_NAME_LABEL}
                type="text"
                formValue={generalInfo?.[LAST_NAME]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[LAST_NAME]}
                required
                className={addFsExcludeClass()}
              />
              <DateOfBirth
                colSpan={3}
                id={DATE_OF_BIRTH}
                name={DATE_OF_BIRTH}
                label={DATE_OF_BIRTH_LABEL}
                type="date"
                showYearDropdown
                formValue={generalInfo?.[DATE_OF_BIRTH]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[DATE_OF_BIRTH]}
                required
              />
              <CustomFormElement
                colSpan={3}
                id={SSN_LAST_FOUR_NAME}
                name={SSN_LAST_FOUR_NAME}
                label={LAST_4_OF_SOCIALS_LABEL}
                type="text"
                formValue={generalInfo?.[SSN_LAST_FOUR_NAME]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[SSN_LAST_FOUR_NAME]}
                disabled={recruit.recruit_type === USER_TYPE}
                required
                className={addFsExcludeClass()}
              />
              <PhoneNumber
                colSpan={3}
                id={PHONE_NAME}
                name={PHONE_NAME}
                label={PHONE_NUMBER_LABEL}
                formValue={generalInfo?.[PHONE_NAME]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[PHONE_NAME]}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id={EMAIL_NAME}
                name={EMAIL_NAME}
                label={EMAIL_LABEL}
                type="text"
                formValue={generalInfo?.[EMAIL_NAME]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[EMAIL_NAME]}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id={RECRUITER_NAME}
                name={RECRUITER_NAME}
                label={SELECT_RECRUITER_LABEL}
                type="selectSearch"
                formValue={generalInfo?.[RECRUITER_NAME]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[RECRUITER_NAME]}
                options={recruiters}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id="senior_team_leader"
                name="senior_team_leader"
                label={SENIOR_TEAM_LEADER}
                type="text"
                loading={recruiterManagersIsLoading}
                formValue={generalInfo?.senior_team_leader}
                onChange={onChangeHandler}
                register={register}
                disabled={true}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id="division_manager"
                name="division_manager"
                label={DIVISION_MANAGER}
                type="text"
                loading={recruiterManagersIsLoading}
                formValue={generalInfo?.division_manager}
                onChange={onChangeHandler}
                register={register}
                disabled={true}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id="regional_manager"
                name="regional_manager"
                label={REGIONAL_MANAGER}
                type="text"
                loading={recruiterManagersIsLoading}
                formValue={generalInfo?.regional_manager}
                onChange={onChangeHandler}
                register={register}
                disabled={true}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id="partnership"
                name="partnership"
                label={PARTNERSHIP}
                type="text"
                loading={recruiterManagersIsLoading}
                formValue={generalInfo?.partnership}
                onChange={onChangeHandler}
                register={register}
                disabled={true}
                required
                className={addFsExcludeClass()}
              />
              <CustomFormElement
                colSpan={3}
                id={RECRUITING_OFFICE_NAME}
                name={RECRUITING_OFFICE_NAME}
                label={RECRUITING_OFFICE_LABEL}
                type="selectSearch"
                formValue={generalInfo?.[RECRUITING_OFFICE_NAME]}
                onChange={onChangeHandler}
                register={register}
                error={errors?.[RECRUITING_OFFICE_NAME]}
                disabled={recruit.type === USER_TYPE}
                options={recruiterRecruitingOffices}
                required
              />
              <div className="sm:col-span-6">
                <ExperienceList
                  constants={getLeadExperienceFields()}
                  canEditField={() => true}
                  onChangeHandler={() => {}}
                />
              </div>
              <div className="sm:col-span-6 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-aptivegreen hover:bg-aptivegreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen-500 sm:w-40 sm:text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

GeneralInfo.propTypes = {
  recruit: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  recruiters: PropTypes.arrayOf(PropTypes.object),
  recruitingOffices: PropTypes.arrayOf(PropTypes.object),
  recruiterManagersIsLoading: PropTypes.bool,
  updateRep: PropTypes.func,
  requestRecruiters: PropTypes.func,
  requestRecruiterManagers: PropTypes.func,
  requestRecruitingOffices: PropTypes.func,
};

const mapStateToProps = (state) => ({
  formErrors: updateRepErrorsSelector(state),
  recruiters: selectRecruiters(state),
  recruitingOffices: selectRecruitingOffices(state),
  recruiterManagersIsLoading: recruiterManagersLoadingSelector(state),
});

const mapDispatchToProps = {
  updateRep: adminUpdateRepAsync.request,
  requestRecruiters: requestRecruitersAsync.request,
  requestRecruitingOffices: requestRecruitingOfficesAsync.request,
  requestRecruiterManagers: requestRecruiterManagersAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);
