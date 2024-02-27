import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { addFsExcludeClass } from '@/lib/utils';
import { CustomFormElement } from '@/components';
import {defaultSelectOption, ledgerConstants} from '@/modules/Housing/lib';

const {
  PAYEE_LABEL,
  PAYEE_NAME,
  DEALER_LABEL,
  DEALER_NAME,
  PAYMENT_METHOD_BM_CREDIT_CARD,
} = ledgerConstants;

const LedgerInfo = ({
  branches,
  apartments,
  teams,
  dealers,
  partnerships,
  paymentMethods,
  paymentTypes,
  onTeamChange,
  onBranchChange,
  onDealerChange,
  onChangeHandler,
}) => {
  const { register, formState: { errors }, getValues } = useFormContext();
  const {
    apartment_ids,
    payment_method_id,
    amount_paid,
    amount_to_pay,
    furniture_damaged,
    rep_utilities,
    apartment_charges
  } = getValues();

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
      <CustomFormElement
        colSpan={3}
        id={DEALER_NAME}
        name={DEALER_NAME}
        label={DEALER_LABEL}
        type="select"
        selectOptions={[...defaultSelectOption, ...dealers]}
        onChange={onDealerChange}
        register={register}
        error={errors?.[DEALER_NAME]}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="branch_id"
        name="branch_id"
        label="Branch"
        type="select"
        selectOptions={[...defaultSelectOption, ...branches]}
        onChange={onBranchChange}
        register={register}
        error={errors?.branch_id}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="team_id"
        name="team_id"
        label="Team"
        type="select"
        selectOptions={[...defaultSelectOption, ...teams]}
        onChange={onTeamChange}
        register={register}
        error={errors?.team_id}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="partnership_id"
        name="partnership_id"
        label="Partnership"
        type="select"
        selectOptions={[...defaultSelectOption, ...partnerships]}
        onChange={onChangeHandler}
        register={register}
        error={errors?.partnership_id}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="apartment_ids"
        name="apartment_ids"
        label="Apartment (Unit ID)"
        type="multiSelect"
        isMulti={true}
        options={apartments}
        onChange={onChangeHandler}
        value={apartment_ids}
        register={register}
        error={errors?.apartment_ids}
        required
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="vendor_number"
        name="vendor_number"
        label="Vendor number"
        type="text"
        onChange={onChangeHandler}
        register={register}
        error={errors?.vendor_number}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="payment_type_id"
        name="payment_type_id"
        label="Type of Payment"
        type="select"
        selectOptions={paymentTypes}
        onChange={onChangeHandler}
        register={register}
        error={errors?.payment_type_id}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="payment_method_id"
        name="payment_method_id"
        label="Payment Method"
        type="select"
        selectOptions={paymentMethods}
        onChange={onChangeHandler}
        register={register}
        error={errors?.payment_method_id}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        label={PAYEE_LABEL}
        id={PAYEE_NAME}
        name={PAYEE_NAME}
        type="text"
        register={register}
        error={errors?.[PAYEE_NAME]}
        onChange={onChangeHandler}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="amount_to_pay"
        name="amount_to_pay"
        label="Amount to Pay"
        type="currency"
        value={amount_to_pay?.toString()}
        mask={{ allowDecimal: true, decimalSymbol: '.', decimalLimit: 2 }}
        onChange={onChangeHandler}
        register={register}
        error={errors?.amount_to_pay}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="furniture_damaged"
        name="furniture_damaged"
        label="Furniture Damages"
        type="currency"
        value={furniture_damaged?.toString()}
        mask={{ allowDecimal: true, decimalSymbol: '.', decimalLimit: 2 }}
        onChange={onChangeHandler}
        register={register}
        error={errors?.furniture_damaged}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="rep_utilities"
        name="rep_utilities"
        label="Rep Utilities"
        type="currency"
        value={rep_utilities?.toString()}
        mask={{ allowDecimal: true, decimalSymbol: '.', decimalLimit: 2 }}
        onChange={onChangeHandler}
        register={register}
        error={errors?.rep_utilities}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="apartment_charges"
        name="apartment_charges"
        label="Apartment Charges"
        type="currency"
        value={apartment_charges?.toString()}
        mask={{ allowDecimal: true, decimalSymbol: '.', decimalLimit: 2, allowNegative: true }}
        onChange={onChangeHandler}
        register={register}
        error={errors?.apartment_charges}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="amount_paid"
        name="amount_paid"
        label="Amount paid"
        type="currency"
        value={amount_paid?.toString()}
        mask={{ allowDecimal: true, decimalSymbol: '.', decimalLimit: 2 }}
        onChange={onChangeHandler}
        register={register}
        error={errors?.amount_paid}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="date_paid"
        name="date_paid"
        label="Date paid"
        type="date"
        onChange={onChangeHandler}
        showYearDropdown
        register={register}
        error={errors?.date_paid}
        className={addFsExcludeClass()}
      />
      <CustomFormElement
        colSpan={3}
        id="date_due"
        name="date_due"
        label="Date due"
        type="date"
        onChange={onChangeHandler}
        showYearDropdown
        register={register}
        error={errors?.date_due}
        className={addFsExcludeClass()}
      />
    </div>
  );
};

LedgerInfo.propTypes = {
  teams: PropTypes.array,
  branches: PropTypes.array,
  apartments: PropTypes.array,
  paymentMethods: PropTypes.array,
  paymentTypes: PropTypes.array,
  partnerships: PropTypes.array,
  onTeamChange: PropTypes.func,
  onBranchChange: PropTypes.func,
  onChangeHandler: PropTypes.func,
};

export default LedgerInfo;
