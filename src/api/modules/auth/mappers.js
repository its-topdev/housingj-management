import { ERROR_500 } from '@/lib/validations';
import { toastType } from '@/components/common';

export const authenticateWithTokenErrors = (error) => {
  const { data: { errors } = {}, status } = error?.response ?? {};

  const toastsData = errors?.map((message) => {
    const errorStatus = Number(status);
    const errorMessage = errorStatus === 500 ? ERROR_500 : message;

    return {
      type: toastType.ERROR,
      message: errorMessage,
    };
  });

  return toastsData ?? [];
};
