import { formatCurrencyStringToNumber } from '@/lib/utils';

export const getLedgers = (response) => {
  const total = response?.meta?.total ?? 0;
  const ledgers = response?.data?.map((ledger) => {
    const {
      id,
      complex_id,
      complex_name,
      branch_id,
      branch_name,
      team_id,
      team_name,
      partnership_id,
      partnership_name,
      apartment_id,
      unit_id,
      dealer_id,
      dealer_name,
      recruiting_season_id,
      vendor_number,
      notes,
      payment_method_id,
      payment_method_name,
      payment_type_id,
      payment_type_name,
      pay_status_id,
      pay_status_name,
      amount_to_pay,
      amount_paid,
      furniture_damaged,
      rep_utilities,
      apartment_charges,
      apartment_deduction,
      expected_rent,
      date_paid,
      date_due,
      payee,
      is_deleted,
    } = ledger?.attributes ?? {};

    return{
      id,
      complex_id,
      complex_name,
      branch_id,
      branch_name,
      team_id,
      team_name,
      partnership_id,
      partnership_name,
      apartment_id,
      unit_id,
      dealer_id,
      dealer_name,
      recruiting_season_id,
      vendor_number,
      notes,
      payment_method_id,
      payment_method_name,
      payment_type_id,
      payment_type_name,
      pay_status_id,
      pay_status_name,
      amount_to_pay,
      amount_paid,
      furniture_damaged,
      rep_utilities,
      apartment_charges,
      apartment_deduction,
      expected_rent,
      date_paid,
      date_due,
      payee,
      is_deleted,
    };
  });

  return { items: ledgers, total };
};

export const prepareDataForCreateLedger = (data) => {
  const {
    dealer_id,
    branch_id,
    team_id,
    partnership_id,
    apartment_ids,
    company_id,
    vendor_number,
    payee,
    payment_method_id,
    payment_type_id,
    amount_to_pay,
    amount_paid,
    date_paid,
    date_due,
    furniture_damaged,
    rep_utilities,
    apartment_charges,
  } = data;

  return {
    dealer_id,
    branch_id,
    team_id,
    partnership_id,
    apartment_ids,
    ...(company_id && { company_id }),
    ...(vendor_number && { vendor_number }),
    ...(payee && { payee }),
    payment: {
      ...(payment_method_id && { method_id: payment_method_id }),
      ...(payment_type_id && { type_id: payment_type_id }),
      amount_to_pay: formatCurrencyStringToNumber(amount_to_pay),
      amount_paid: formatCurrencyStringToNumber(amount_paid),
      ...(date_paid && { date_paid }),
      ...(date_due && { date_due }),
    },
    furniture_damaged: formatCurrencyStringToNumber(furniture_damaged),
    rep_utilities: formatCurrencyStringToNumber(rep_utilities),
    apartment_charges: formatCurrencyStringToNumber(apartment_charges),
  };
};

export const getLedgerHistory = (response) => {
  const history = response?.data?.map((record) => {
    const {
      field_name,
      changed_from,
      changed_from_addition,
      changed_to,
      changed_to_addition,
      changed_at,
      changed_by_name,
      changed_by_id,
    } = record?.attributes ?? {};

    return {
      field_name,
      changed_from,
      changed_from_addition,
      changed_to,
      changed_to_addition,
      changed_at,
      changed_by_name,
      changed_by_id,
    };
  });
  
  return history;
}
