import React, { useState } from 'react';
import BoxLayout from '../../layouts/BoxLayout/BoxLayout';
import { CheckboxInput, CheckboxGroup } from '../../components/inputs/CheckboxInput/CheckboxInput'
import { Button } from '../../components/inputs/Button/Button'
import styles from './OnboardingPage.module.css';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const onSkip = () => {
    navigate('/explore');
  }

  const onNext = () => {
    navigate('/explore');
  }

  return (
    <BoxLayout>
      <h1 className={styles.title}>What topics are you interested in?</h1>
      <CheckboxGroup
        value={selected}
        onChange={setSelected}
        direction='row'
      >
        <CheckboxInput variant='secondary' label="Tech" value="tech" />
        <CheckboxInput variant='secondary' label="Sports" value="sports" />
        <CheckboxInput variant='secondary' label="Food" value="food" />
        <CheckboxInput variant='secondary' label="Travel" value="travel" />
        <CheckboxInput variant='secondary' label="News" value="news" />
        <CheckboxInput variant='secondary' label="Health" value="health" />
        <CheckboxInput variant='secondary' label="Entertainment" value="entertainment" />
        <CheckboxInput variant='secondary' label="Fashion" value="fashion" />
        <CheckboxInput variant='secondary' label="Science" value="science" />
        <CheckboxInput variant='secondary' label="Politics" value="politics" />
        <CheckboxInput variant='secondary' label="Business" value="business" />
        <CheckboxInput variant='secondary' label="Education" value="education" />
        <CheckboxInput variant='secondary' label="Sports" value="sports" />
        <CheckboxInput variant='secondary' label="Technology" value="technology" />
        <CheckboxInput variant='secondary' label="Food" value="food" />
        <CheckboxInput variant='secondary' label="Travel" value="travel" />
        <CheckboxInput variant='secondary' label="Health" value="health" />
        <CheckboxInput variant='secondary' label="Entertainment" value="entertainment" />
        <CheckboxInput variant='secondary' label="Fashion" value="fashion" />
        <CheckboxInput variant='secondary' label="Science" value="science" />
        <CheckboxInput variant='secondary' label="Politics" value="politics" />
        <CheckboxInput variant='secondary' label="Business" value="business" />
        <CheckboxInput variant='secondary' label="Education" value="education" />
      </CheckboxGroup>
      <div className={styles.buttonWrapper}>
        <Button variant='secondary' onClick={onSkip}>Skip</Button>
        <Button variant='primary' onClick={onNext}>Next</Button>
      </div>
    </BoxLayout>
  );
};

export default OnboardingPage;
