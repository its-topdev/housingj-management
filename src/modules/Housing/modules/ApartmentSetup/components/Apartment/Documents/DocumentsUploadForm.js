import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRef, useState, useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import ApartmentFormWrapper from '../Modal/ApartmentFormWrapper';
import { CustomButtonGroup, CustomFormElement } from '@/components/common';
import { useFormActions, fileAcceptValidation } from '@/modules/Housing/modules/ApartmentSetup/lib/';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';
import {
  apartmentConstants,
} from '@/modules/Housing/lib';
import {
  apartmentDataSelector,
  documentUploadDataSelector,
} from '@/modules/Housing/redux/apartment';

const FILE_UPLOAD= 'file_upload';
const {
  DOCUMENT_UPLOAD_FORM_TITLE,
  DOCUMENT_UPLOAD_FORM_NAME,
  DOCUMENT_UPLOAD_NAME,
} = apartmentConstants;

const DocumentsUploadForm = ({
  // Own Props
  complex,
  apartmentId,
  nextStep,
  onClose,
  // State / Dispatch
  isApartmentLoading,
  documentUploadData,
  selectedApartment,
}) => {
  const formRef = useRef(null);

  const {
    methods,
    handleSubmitForm,
  } = useFormActions({
    formData: documentUploadData,
    nextStep,
    apartmentId,
    complexId: complex?.id,
    selected: selectedApartment,
    formDataName: DOCUMENT_UPLOAD_FORM_NAME,
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const [documentFileShowName, setDocumentFileShowName] = useState('');

  const handleFileChange = useCallback((event) => {
    const { name, type, files } = event.target;
    const fileValidation = fileAcceptValidation(files[0].name, files[0].size);
    if (fileValidation.status) {
      if (type === 'file') {
        setDocumentFileShowName(files[0].name);
        getBase64(files[0])
          .then((result) => {
            const fileInfo = {
              'file-name': files[0].name,
              'mime-type': files[0].type,
              'content': result,
            };
            setValue(name, fileInfo, { });
          });
      } else {
        setValue(name, '', { });
      }
    } else {
      setValue(name, '', { });
      setDocumentFileShowName(fileValidation.msg);
    }
  }, [
    setValue,
  ]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  return (
    <ApartmentFormWrapper ref={formRef} step={6} title={DOCUMENT_UPLOAD_FORM_TITLE} isLoading={isApartmentLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm(onClose))}>
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
            <CustomFormElement
              id={FILE_UPLOAD}
              name={FILE_UPLOAD}
              type="file"
              inputFileName={DOCUMENT_UPLOAD_NAME}
              inputFileId={DOCUMENT_UPLOAD_NAME}
              onChange={handleFileChange}
              register={register}
              error={errors?.[DOCUMENT_UPLOAD_NAME]}
            />
          </div>
          {documentFileShowName.length > 0 && (
            <div className="bg-blue-100 p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
              <p className="ml-3 text-sm text-blue-700">{documentFileShowName}</p>
            </div>
          )}

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

DocumentsUploadForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  nextStep: PropTypes.object,
  onClose: PropTypes.func,
  isApartmentLoading: PropTypes.bool,
  documentUploadData: PropTypes.object,
  createApartment: PropTypes.func,
  updateApartment: PropTypes.func,
  selectedApartment: PropTypes.object,
  setSelectedApartment: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isApartmentLoading: apartmentFormLoadingSelector(state),
  selectedApartment: apartmentDataSelector(state),
  documentUploadData: documentUploadDataSelector(state),
});

export default connect(mapStateToProps)(DocumentsUploadForm);
