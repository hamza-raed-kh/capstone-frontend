import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery, useUpdateMeMutation } from '../../../features/api/authApi';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import TextInput from '../../../components/inputs/TextInput/TextInput';
import TextArea from '../../../components/inputs/TextArea/TextArea';
import GenderInput from '../../../components/inputs/GenderInput/GenderInput';
import DateInput from '../../../components/inputs/DateInput/DateInput';
import FileInput from '../../../components/inputs/FileInput/FileInput';
import { Button } from '../../../components/inputs/Button/Button';
import { addToast } from '../../../features/toast/toastSlice';
import styles from './YourInfoPage.module.css';

const INITIAL_DRAFT = {
  firstName: '',
  lastName: '',
  aboutMe: '',
  gender: '',
  dateOfBirth: null,
  profilePicUrl: '',
  profilePicFile: null,
};

const YourInfoPage = () => {
  const dispatch = useDispatch();
  const { data: userProfile } = useGetMeQuery(undefined, { skip: false });
  const [updateMe] = useUpdateMeMutation();

  const [draft, setDraft] = useState(INITIAL_DRAFT);

  useEffect(() => {
    if (userProfile) {
      setDraft({
        firstName: userProfile.first_name || '',
        lastName: userProfile.last_name || '',
        aboutMe: userProfile.bio || '',
        gender: userProfile.gender || '',
        dateOfBirth: userProfile.date_of_birth || null,
        profilePicUrl: userProfile.profile_picture || '',
        profilePicFile: null,
      });
    }
  }, [userProfile]);

  const hasChanges = useMemo(() => {
    if (!userProfile) return false
    return (
      draft.firstName !== (userProfile.first_name || '') ||
      draft.lastName !== (userProfile.last_name || '') ||
      draft.aboutMe !== (userProfile.bio || '') ||
      draft.gender !== (userProfile.gender || '') ||
      draft.dateOfBirth !== (userProfile.date_of_birth || null) ||
      !!draft.profilePicFile
    )
  }, [draft, userProfile])

  const updateDraft = (field) => (value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, profilePicFile: file, profilePicUrl: url }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;
    try {
      const fd = new FormData();
      fd.append('first_name', draft.firstName);
      fd.append('last_name', draft.lastName);
      fd.append('bio', draft.aboutMe || '');
      if (draft.gender) fd.append('gender', draft.gender);
      if (draft.dateOfBirth) fd.append('date_of_birth', typeof draft.dateOfBirth === 'string'
        ? draft.dateOfBirth
        : draft.dateOfBirth.toISOString().split('T')[0]);
      if (draft.profilePicFile) fd.append('profile_picture', draft.profilePicFile);
      await updateMe(fd).unwrap();
      dispatch(addToast({ message: 'Profile updated successfully!', type: 'success' }));
    } catch {
      dispatch(addToast({ message: 'Failed to update profile.', type: 'error' }));
    }
  };

  const handleDiscard = () => {
    if (userProfile) {
      setDraft({
        firstName: userProfile.first_name || '',
        lastName: userProfile.last_name || '',
        aboutMe: userProfile.bio || '',
        gender: userProfile.gender || '',
        dateOfBirth: userProfile.date_of_birth || null,
        profilePicUrl: userProfile.profile_picture || '',
        profilePicFile: null,
      });
    }
  };

  return (
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

              {/* Email (read-only — cannot be changed) */}
              <div className={styles.row}>
                <span className={styles.rowLabel}>Email</span>
                <TextInput label="Email" inlineLabel type="email" value={userProfile?.email || ''} readOnly />
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
                {hasChanges && <Button variant="red-secondary" onClick={handleDiscard}>Discard</Button>}
                <Button variant="primary" onClick={handleSave}>Save</Button>
              </div>

            </form>
          </div>
    </div>
  );
};

export default YourInfoPage;
