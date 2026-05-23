import React, { useState } from 'react';
import BoxLayout from '../../../layouts/BoxLayout/BoxLayout';
import { CheckboxInput, CheckboxGroup } from '../../../components/inputs/CheckboxInput/CheckboxInput'
import { Button } from '../../../components/inputs/Button/Button'
import styles from './OnboardingPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useGetTopicsQuery } from '../../../features/api/topicApi';
import { useSetMeInterestsMutation } from '../../../features/api/authApi';

const OnboardingPage = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const { data: topicsData, isLoading: topicsLoading } = useGetTopicsQuery();
  const topics = topicsData?.results;
  const [setInterests, { isLoading: saving }] = useSetMeInterestsMutation();

  const onSkip = () => {
    navigate('/explore');
  };

  const onNext = async () => {
    if (selected.length > 0) {
      await setInterests(selected.map(Number));
    }
    navigate('/explore');
  };

  if (topicsLoading) {
    return (
      <BoxLayout>
        <p>Loading topics...</p>
      </BoxLayout>
    );
  }

  return (
    <BoxLayout>
      <h1 className={styles.title}>What topics are you interested in?</h1>
      {topics && (
        <CheckboxGroup
          value={selected}
          onChange={setSelected}
          direction='row'
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
      )}
      <div className={styles.buttonWrapper}>
        <Button variant='secondary' onClick={onSkip}>Skip</Button>
        <Button variant='primary' onClick={onNext} disabled={saving}>
          {saving ? 'Saving...' : 'Next'}
        </Button>
      </div>
    </BoxLayout>
  );
};

export default OnboardingPage;
