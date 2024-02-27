import { toastType } from '@/components/common';
import { ERROR_500 } from '@/lib/validations';

export const mapErrorToastsData = (error) => {
  const { data: { errors } = {} } = error?.response ?? {};

  const toastsData = errors?.map(({ title: message, detail: details, status }) => {
    const errorStatus = Number(status);
    const errorMessage = errorStatus === 500 ? ERROR_500 : message;
    const errorDetails = errorStatus === 500 ? null : details;

    return {
      type: toastType.ERROR,
      message: errorMessage,
      details: errorDetails,
    };
  });

  return toastsData ?? [];
};

export const mapSuccessToastsData = (response) => {
  const { message } = response?.data?.attributes ?? {};

  return [{
    type: toastType.SUCCESS,
    message: message,
    details: null,
  }];
};
