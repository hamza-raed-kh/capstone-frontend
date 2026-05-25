import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery, useGetMeInterestsQuery, useSetMeInterestsMutation, useUpdateMeMutation } from '../../../features/api/authApi';
import { useGetTopicsQuery } from '../../../features/api/topicApi';
import { selectTheme, setTheme } from '../../../features/user/userSlice';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import { CheckboxInput, CheckboxGroup } from '../../../components/inputs/CheckboxInput/CheckboxInput';
import { Button } from '../../../components/inputs/Button/Button';
import Icon from '../../../components/ui/Icon/Icon';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { addToast } from '../../../features/toast/toastSlice';
import styles from './PersonalizationPage.module.css';

const THEME_OPTIONS = [
  { label: 'Light', value: 'light', icon: 'ph:sun-fill' },
  { label: 'Dark', value: 'dark', icon: 'ph:moon-fill' },
  { label: 'System', value: 'system', icon: 'ph:desktop-fill' },
];

const PersonalizationPage = () => {
  const dispatch = useDispatch();
  const savedTheme = useSelector(selectTheme);
  const { data: me } = useGetMeQuery();
  const { data: topicsData } = useGetTopicsQuery();
  const { data: myTopicIds } = useGetMeInterestsQuery();
  const [setMeInterests, { isLoading: savingInterests }] = useSetMeInterestsMutation();
  const [updateMe, { isLoading: savingTheme }] = useUpdateMeMutation();

  const topics = useMemo(() => topicsData?.results || topicsData || [], [topicsData]);

  const [draftTopicIds, setDraftTopicIds] = useState([]);
  const [draftTheme, setDraftTheme] = useState(savedTheme);

  useEffect(() => {
    if (myTopicIds) setDraftTopicIds(myTopicIds.map(String));
  }, [myTopicIds]);

  useEffect(() => {
    if (me?.theme) setDraftTheme(me.theme);
  }, [me?.theme]);

  // Live theme preview
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
    applyTheme(draftTheme);
    return () => applyTheme(savedTheme);
  }, [draftTheme, savedTheme]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const promises = [];
      promises.push(setMeInterests(draftTopicIds.map(Number)).unwrap());
      if (draftTheme !== (me?.theme || savedTheme)) {
        promises.push(updateMe({ theme: draftTheme }).unwrap());
      }
      await Promise.all(promises);
      dispatch(setTheme(draftTheme));
      dispatch(addToast({ message: 'Personalization saved!', type: 'success' }));
    } catch {
      dispatch(addToast({ message: 'Failed to save settings.', type: 'error' }));
    }
  };

  const handleDiscard = () => {
    setDraftTopicIds(myTopicIds?.map(String) || []);
    setDraftTheme(savedTheme);
  };

  return (
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
              value={draftTopicIds}
              onChange={setDraftTopicIds}
              direction='row'
              className={styles.interestsGrid}
            >
              {topics.map((topic) => (
                <CheckboxInput
                  key={topic.id}
                  variant='secondary'
                  label={topic.name}
                  value={String(topic.id)}
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
              value={draftTheme}
              onValueChange={setDraftTheme}
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
          <Button variant="primary" type="submit">{savingInterests || savingTheme ? 'Saving...' : 'Save'}</Button>
        </div>

      </form>
    </div>
  );
};

export default PersonalizationPage;
