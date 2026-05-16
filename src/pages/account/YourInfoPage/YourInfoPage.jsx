import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetMeQuery, useUpdateMeMutation } from '../../../features/api/authApi';
import SearchBar from '../../../components/ui/SearchBar/SearchBar';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import SectionedLayout from '../../../layouts/SectionedLayout/SectionedLayout';
import TextInput from '../../../components/inputs/TextInput/TextInput';
import TextArea from '../../../components/inputs/TextArea/TextArea';
import GenderInput from '../../../components/inputs/GenderInput/GenderInput';
import DateInput from '../../../components/inputs/DateInput/DateInput';
import FileInput from '../../../components/inputs/FileInput/FileInput';
import { Button } from '../../../components/inputs/Button/Button';
import Icon from '../../../components/ui/Icon/Icon';
import { addToast } from '../../../features/toast/toastSlice';
import styles from './YourInfoPage.module.css';

const INITIAL_DRAFT = {
  firstName: '',
  lastName: '',
  email: '',
  aboutMe: '',
  gender: '',
  dateOfBirth: null,
  profilePicUrl: '',
};

const YourInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userProfile } = useGetMeQuery(undefined, { skip: false });
  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const [draft, setDraft] = useState(INITIAL_DRAFT);

  useEffect(() => {
    if (userProfile) {
      setDraft({
        firstName: userProfile.first_name || '',
        lastName: userProfile.last_name || '',
        email: userProfile.email || '',
        aboutMe: userProfile.bio || '',
        gender: userProfile.gender || '',
        dateOfBirth: userProfile.date_of_birth || null,
        profilePicUrl: userProfile.profile_picture || '',
      });
    }
  }, [userProfile]);

  const updateDraft = (field) => (value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, profilePicUrl: url }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateMe({
        first_name: draft.firstName,
        last_name: draft.lastName,
        email: draft.email,
        bio: draft.aboutMe,
        gender: draft.gender || undefined,
        date_of_birth: draft.dateOfBirth || undefined,
      }).unwrap();
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
        email: userProfile.email || '',
        aboutMe: userProfile.bio || '',
        gender: userProfile.gender || '',
        dateOfBirth: userProfile.date_of_birth || null,
        profilePicUrl: userProfile.profile_picture || '',
      });
    }
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
                <div className={styles.actionRowRight}>
                  <Button variant="secondary" onClick={() => navigate('/account/security')}>Security</Button>
                  <Button variant="primary" onClick={handleSave}>Save</Button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </SectionedLayout>
  );
};

export default YourInfoPage;