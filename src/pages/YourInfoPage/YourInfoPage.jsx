import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import SectionedLayout from '../../layouts/SectionedLayout/SectionedLayout';
import TextInput from '../../components/inputs/TextInput/TextInput';
import TextArea from '../../components/inputs/TextArea/TextArea';
import GenderInput from '../../components/inputs/GenderInput/GenderInput';
import DateInput from '../../components/inputs/DateInput/DateInput';
import FileInput from '../../components/inputs/FileInput/FileInput';
import { Button } from '../../components/inputs/Button/Button';
import Icon from '../../components/Icon/Icon';
import {
  selectUser,
  setUserProfile,
} from '../../features/user/userSlice';
import { addToast } from '../../features/toast/toastSlice';
import styles from './YourInfoPage.module.css';

const YourInfoPage = () => {
  const dispatch = useDispatch();
  const savedUser = useSelector(selectUser);

  // Local draft — only flushed to the store on "Save Changes"
  const [draft, setDraft] = useState({ ...savedUser });

  // Keep draft in sync if store changes externally (e.g. API pre-fill)
  useEffect(() => {
    setDraft({ ...savedUser });
  }, [savedUser]);

  const updateDraft = (field) => (value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    // Still update draft so the save button works correctly
    setDraft((prev) => ({ ...prev, profilePicUrl: url }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      dispatch(setUserProfile(draft));
      dispatch(addToast({ message: 'Profile updated successfully!', type: 'success' }));
    } catch (error) {
      dispatch(addToast({ message: 'Failed to update profile.', type: 'error' }));
    }
  };

  const handleDiscard = () => {
    setDraft({ ...savedUser });
  };

  return (
    <SectionedLayout preset="account">
      <div className={styles.pageContainer}>
        <div className={styles.pageSearchSection}>
          <SearchBar variant="placeholder">Account Center</SearchBar>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyHeader}>
            <SectionHeader icon={'material-symbols:info-rounded'} title={'Your Information'} />
          </div>
          <div className={styles.bodyQuestionList}>
            <form className={styles.form} onSubmit={handleSave}>

              {/* Profile Picture */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>Profile Picture</span>
                <FileInput
                  variant="avatar"
                  previewUrl={draft.profilePicUrl}
                  onChange={handlePicChange}
                  accept="image/*"
                />
              </div>

              {/* Email */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>Email</span>
                <TextInput label="Email" inlineLabel type="email" value={draft.email} onChange={(e) => updateDraft('email')(e.target.value)} />
              </div>

              {/* First Name */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>First Name</span>
                <TextInput label="First Name" inlineLabel value={draft.firstName} onChange={(e) => updateDraft('firstName')(e.target.value)} />
              </div>

              {/* Last Name */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>Last Name</span>
                <TextInput label="Last Name" inlineLabel value={draft.lastName} onChange={(e) => updateDraft('lastName')(e.target.value)} />
              </div>

              {/* About Me */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>About Me</span>
                <TextArea label="About Me" inlineLabel rows={3} value={draft.aboutMe} onChange={(e) => updateDraft('aboutMe')(e.target.value)} />
              </div>

              {/* Gender */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>Gender</span>
                <GenderInput value={draft.gender} onChange={updateDraft('gender')} />
              </div>

              {/* Date of Birth */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>Date of Birth</span>
                <DateInput label="Date of Birth" inlineLabel value={draft.dateOfBirth} onChange={updateDraft('dateOfBirth')} />
              </div>

              {/* Action Row */}
              <div className={`${styles.actionRow}`}>
                <Button variant="red-secondary" onClick={handleDiscard}>Discard</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </SectionedLayout>
  );
};

export default YourInfoPage;