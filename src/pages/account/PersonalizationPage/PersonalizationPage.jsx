import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../components/ui/SearchBar/SearchBar';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import SectionedLayout from '../../../layouts/SectionedLayout/SectionedLayout';
import { CheckboxInput, CheckboxGroup } from '../../../components/inputs/CheckboxInput/CheckboxInput';
import { Button } from '../../../components/inputs/Button/Button';
import Icon from '../../../components/ui/Icon/Icon';
import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  selectUser,
  setUserProfile,
} from '../../../features/user/userSlice';
import { addToast } from '../../../features/toast/toastSlice';
import styles from './PersonalizationPage.module.css';

const INTEREST_OPTIONS = [
  { label: 'Technology', value: 'tech' },
  { label: 'Sports', value: 'sports' },
  { label: 'Food', value: 'food' },
  { label: 'Travel', value: 'travel' },
  { label: 'News', value: 'news' },
  { label: 'Health', value: 'health' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Science', value: 'science' },
  { label: 'Politics', value: 'politics' },
  { label: 'Business', value: 'business' },
  { label: 'Education', value: 'education' },
];

const THEME_OPTIONS = [
  { label: 'Light', value: 'light', icon: 'ph:sun-fill' },
  { label: 'Dark', value: 'dark', icon: 'ph:moon-fill' },
  { label: 'System', value: 'system', icon: 'ph:desktop-fill' },
];

const PersonalizationPage = () => {
  const dispatch = useDispatch();
  const savedUser = useSelector(selectUser);

  // Local draft state
  const [draft, setDraft] = useState(savedUser);

  // Sync draft when store updates (e.g., initial load or save)
  useEffect(() => {
    setDraft(savedUser);
  }, [savedUser]);

  // Live preview and auto-discard logic
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (t) => {
      if (!t) return;
      if (t === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', t);
      }
    };

    // Apply the draft theme for live preview
    applyTheme(draft.theme);

    // Cleanup: When leaving the page (unmounting), revert to the officially saved theme
    return () => {
      applyTheme(savedUser.theme);
    };
  }, [draft.theme, savedUser.theme]);



  const updateDraft = (field) => (value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  const handleSave = (e) => {
    e.preventDefault();
    try {
      dispatch(setUserProfile(draft));
      dispatch(addToast({ message: 'Personalization saved!', type: 'success' }));
    } catch (error) {
      dispatch(addToast({ message: 'Failed to save settings.', type: 'error' }));
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
          <form className={styles.form} onSubmit={handleSave}>

            {/* Interests Section */}
            <div className={styles.section}>
              <SectionHeader icon={'ph:heart-fill'} title={'Interests'} />
              <div className={styles.sectionContent}>
                <p className={styles.sectionDescription}>
                  Select topics you're interested in to personalize your feed.
                </p>
                <CheckboxGroup
                  value={draft.interests || []}
                  onChange={updateDraft('interests')}
                  direction='row'
                  className={styles.interestsGrid}
                >
                  {INTEREST_OPTIONS.map((opt) => (
                    <CheckboxInput
                      key={opt.value}
                      variant='secondary'
                      label={opt.label}
                      value={opt.value}
                    />
                  ))}
                </CheckboxGroup>
              </div>
            </div>

            {/* Theme Section */}
            <div className={styles.section}>
              <SectionHeader icon={'ph:paint-brush-fill'} title={'Appearance'} />
              <div className={styles.sectionContent}>
                <p className={styles.sectionDescription}>
                  Choose how the application looks for you.
                </p>
                <RadioGroup.Root
                  className={styles.themeGrid}
                  value={draft.theme}
                  onValueChange={updateDraft('theme')}
                >
                  {THEME_OPTIONS.map((opt) => (
                    <RadioGroup.Item
                      key={opt.value}
                      value={opt.value}
                      id={`theme-${opt.value}`}
                      className={styles.themeCard}
                    >
                      <div className={styles.themeIconWrapper}>
                        <Icon icon={opt.icon} size={20} />
                      </div>
                      <span className={styles.themeLabel}>{opt.label}</span>
                      <RadioGroup.Indicator className={styles.themeIndicator}>
                        <Icon icon="mdi:check-circle" size={16} />
                      </RadioGroup.Indicator>
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              </div>
            </div>

            {/* Action Row */}
            <div className={styles.actionRow}>
              <Button variant="red-secondary" type="button" onClick={handleDiscard}>Discard</Button>
              <Button variant="primary" type="submit">Save</Button>
            </div>

          </form>
        </div>
      </div>
    </SectionedLayout>
  );
};

export default PersonalizationPage;
