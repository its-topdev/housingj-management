import { dashboardConstants, onboardingConstants } from '@/lib';
import { CustomFormElement, DateOfBirth, PhoneNumber } from '@/components/common';
import { addFsExcludeClass } from '@/lib/utils';

const RequiredInfo = ({ errors, onChangeField, register }) => {
  const {
    RECRUIT_INFO,
    FIRST_NAME_LABEL,
    LAST_NAME_LABEL,
    EMAIL_LABEL,
    PHONE_LABEL,
    LAST_4_OF_SOCIALS_LABEL,
    BIRTH_DATE_LABEL,
    EMAIL_NAME,
    PHONE_NAME,
    SSN_LAST_FOUR_NAME,
  } = dashboardConstants;
  const {
    FIRST_NAME,
    LAST_NAME,
    DATE_OF_BIRTH,
    COUNTRY_CODE_LABEL,
    COUNTRY_CODE_TEXT,
  } = onboardingConstants

  return (
    <div className="pt-4">
      <div>
        <h3 className="font-medium leading-6 text-md text-aptivegreen">
          {RECRUIT_INFO}
        </h3>
      </div>
      <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
        <CustomFormElement
          label={FIRST_NAME_LABEL}
          name={FIRST_NAME}
          id={FIRST_NAME}
          type="text"
          required
          colSpan={3}
          onChange={onChangeField}
          error={errors?.firstName}
          register={register}
          className={addFsExcludeClass()}
        />

        <CustomFormElement
          label={LAST_NAME_LABEL}
          name={LAST_NAME}
          id={LAST_NAME}
          onChange={onChangeField}
          required
          colSpan={3}
          type="text"
          error={errors?.lastName}
          register={register}
          className={addFsExcludeClass()}
        />

        <CustomFormElement
          colSpan={3}
          label={COUNTRY_CODE_LABEL}
          type="text"
          value={COUNTRY_CODE_TEXT}
          disabled
        />

        <PhoneNumber
          label={PHONE_LABEL}
          id={PHONE_NAME}
          name={PHONE_NAME}
          onChange={onChangeField}
          required
          colSpan={3}
          type="text"
          error={errors?.phone}
          register={register}
          className={addFsExcludeClass()}
        />

        <CustomFormElement
          name={EMAIL_NAME}
          id={EMAIL_NAME}
          label={EMAIL_LABEL}
          onChange={onChangeField}
          required
          colSpan={3}
          type="text"
          error={errors?.email}
          register={register}
          className={addFsExcludeClass()}
        />

        <CustomFormElement
          label={LAST_4_OF_SOCIALS_LABEL}
          id={SSN_LAST_FOUR_NAME}
          name={SSN_LAST_FOUR_NAME}
          placeholder="7654"
          onChange={onChangeField}
          colSpan={3}
          type="text"
          error={errors?.ssnLastFour}
          register={register}
          className={addFsExcludeClass()}
        />

        <DateOfBirth
          label={BIRTH_DATE_LABEL}
          name={DATE_OF_BIRTH}
          id={DATE_OF_BIRTH}
          required
          onChange={onChangeField}
          colSpan={3}
          type="date"
          showYearDropdown
          error={errors?.dob}
          register={register}
        />
      </div>
    </div>
  );
};

export default RequiredInfo;
