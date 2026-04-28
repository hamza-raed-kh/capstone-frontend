import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BoxLayout from '../../layouts/BoxLayout/BoxLayout';
import TextInput from '../../components/inputs/TextInput/TextInput';
import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import GenderInput from '../../components/inputs/GenderInput/GenderInput';
import DateInput from '../../components/inputs/DateInput/DateInput'
import styles from './SignupPage.module.css';
import Image from '../../assets/Login Page Illustration.png';

const SignupPage = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  return (
    <BoxLayout image={Image}>
      <h1 className={styles.title}>Create Account</h1>
      {/* <p className={styles.subtitle}>Join Sanfoor Arena today</p> */}

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputRow}>
          <TextInput label="First Name" inlineLabel value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextInput label="Last Name" inlineLabel value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <TextInput label="Username" inlineLabel value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextInput label="Email" inlineLabel type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label="Password" inlineLabel value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordInput label="Confirm Password" inlineLabel value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <DateInput label="Date of Birth" inlineLabel />
        <GenderInput label="Gender" inlineLabel />

        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>

      <p className={styles.footerText}>
        Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
      </p>
    </BoxLayout>
  );
};

export default SignupPage;
