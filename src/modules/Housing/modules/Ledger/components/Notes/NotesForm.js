import { useFormContext } from 'react-hook-form';
import { addFsExcludeClass } from '@/lib/utils';
import { CustomFormElement } from '@/components';
import NotesFooter from './NotesFooter';
import NotesHeader from './NotesHeader';
import NoteCard from './NoteCard';
import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { connect } from 'react-redux';
import { userSelector } from '@/redux/auth'

const NotesForm = ({
  setNoteValue,
  note,
  user,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [isNewNote, setIsNewNote] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleKeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setIsNewNote(true);
      setIsDisabled(true);
      setValue('note', '', { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <div className="relative h-full">
      <NotesHeader />
      {isNewNote && <NoteCard note={note} author={user.first_name + user.last_name} />}
      <NotesFooter>
        <div className="relative">
          <CustomFormElement
            colSpan={3}
            id="note"
            name="note"
            type="text"
            onKeyDown={handleKeydown}
            onChange={(event) => setNoteValue(event.target.value)}
            placeholder="Add a note"
            register={register}
            error={errors?.note}
            required
            disabled={isDisabled}
            className={addFsExcludeClass('pr-10')}
          />
          <div className="absolute py-3 px-4 right-0 top-0">
            <PaperAirplaneIcon color="gray" className="h-4 w-4" />
          </div>
        </div>
      </NotesFooter>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: userSelector(state),
})

export default connect(mapStateToProps)(NotesForm);
