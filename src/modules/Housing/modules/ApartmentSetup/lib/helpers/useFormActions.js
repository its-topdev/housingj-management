import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { combineApartmentData } from '@/modules/Housing/modules/ApartmentSetup/lib';
import { useStableCallback } from '@/hooks';
import { formatCurrencyStringToNumber, formatNumberToCurrencyString } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import {
  createApartmentAsync,
  updateApartmentAsync,
  setSelectedApartmentAction,
} from '@/modules/Housing/redux/apartment';

export function useFormActions({
  validationSchema,
  formData,
  nextStep,
  complexId,
  apartmentId,
  selected,
  formDataName,
}) {
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: formData,
    mode: 'all',
    reValidateMode: 'onChange',
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
  } = methods;

  const handleChange = useCallback((event) => {
    const { name, type, files } = event.target;
    let { value } = event.target;

    value = type === 'file' ? files[0] : value;

    setValue(name, value, { shouldValidate: true, shouldDirty: true, shouldTouch: type !== 'file' });
  }, [
    setValue,
  ]);

  const onChangeDecimalCurrency = (event, name) => {
    handleChange({
      target: {
        name,
        value: formatNumberToCurrencyString(
          formatCurrencyStringToNumber(event.target.value),
          2,
        ),
      },
      type: event.type,
    });
  };

  const handleSubmitForm = useStableCallback((onSuccess) => {
    const updateApartmentCallback = apartmentId ? updateApartmentAsync.request : createApartmentAsync.request;
    const sendingData = apartmentId ? { [formDataName]: getValues() } : {
      ...selected,
      [formDataName] : getValues(),
    };

    dispatch(updateApartmentCallback({
      data: Object.entries(sendingData).reduce((acc, [, data]) => {
        return { ...acc, ...combineApartmentData(data || {}) };
      }, {}),
      complexId,
      ...(apartmentId && { apartment_id: apartmentId }),
      successCallback: onSuccess ?? (() => {}),
    }));
  });

  useEffect(() => {
    if (nextStep && apartmentId) {
      handleSubmit(
        () => handleSubmitForm(nextStep.applyTransition),
        () => nextStep.declineTransition(),
      )();
    } else if (nextStep) {
      const values = getValues();

      handleSubmit(() => {
        dispatch(setSelectedApartmentAction({
          [formDataName] : values,
        }));
        nextStep.applyTransition();
      })();
    }
  }, [
    nextStep,
    handleSubmit,
    handleSubmitForm,
    apartmentId,
    formDataName,
    getValues,
    dispatch,
  ]);

  return {
    methods,
    handleChange,
    handleSubmitForm,
    onChangeDecimalCurrency,
  };
}
