export const prepareDataForCreateComplex = (data) => {
  const { type, dealer_id, name, email, phone, team_ids, city, state, zip, street, contact } = data;

  return {
    type,
    dealer_id,
    name,
    email,
    phone: phone?.replace(/[^0-9]/g, ''),
    team_ids,
    contact,
    address: {
      city,
      state,
      zip: zip?.replace(/[^0-9]/g, ''),
      street,
    },
  };
};

export const prepareDataForApartment = (data) => {
  return data;
};

export const getComplexes = (response) => {
  const total = response?.meta?.total ?? 0;
  const complexes = response?.data?.map((complex) => {
    const {
      id,
      name,
      address,
    } = complex?.attributes ?? {};

    return {
      id,
      name,
      address,
    };
  });

  return { items: complexes, total };
};

export const getComplexSummaries = (response) => {
  const complexes = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return complexes.map((complex) => {
    const {
      id: value,
      name,
    } = complex?.attributes ?? {};

    return {
      name,
      value,
    };
  });
}

export const getApartmentSummaries = (response) => {
  const apartments = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return apartments.map((apartment) => {
    const {
      id: value,
      unit_id: label,
    } = apartment?.attributes ?? {};

    return {
      value,
      label,
    };
  });
};

export const getPaymentMethods = (response) => {
  const paymentMethods = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return paymentMethods.map((paymentMethod) => {
    const {
      id: value,
      name,
    } = paymentMethod?.attributes ?? {};

    return {
      value,
      name,
    };
  });
};

export const getPaymentTypes = (response) => {
  const paymentTypes = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return paymentTypes.map((paymentType) => {
    const {
      id: value,
      name,
    } = paymentType?.attributes ?? {};

    return {
      value,
      name,
    };
  });
};
