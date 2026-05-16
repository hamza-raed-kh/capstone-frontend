import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation, useLoginMutation } from '../../../features/api/authApi';
import { apiSlice } from '../../../features/api/apiSlice';
import { setTokens } from '../../../features/user/userSlice';
import BoxLayout from '../../../layouts/BoxLayout/BoxLayout';
import TextInput from '../../../components/inputs/TextInput/TextInput';
import PasswordInput from '../../../components/inputs/PasswordInput/PasswordInput';
import GenderInput from '../../../components/inputs/GenderInput/GenderInput';
import DateInput from '../../../components/inputs/DateInput/DateInput'
import styles from './SignupPage.module.css';
import Image from '../../../assets/Login Page Illustration.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : undefined,
        gender: gender || undefined,
      }).unwrap();

      const data = await login({ email, password }).unwrap();
      dispatch(setTokens({ access: data.access, refresh: data.refresh }));
      dispatch(apiSlice.util.invalidateTags(['User']));
      navigate('/explore');
    } catch (err) {
      if (err?.data) {
        const messages = Object.values(err.data).flat().join(' ');
        setError(messages || 'Registration failed.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BoxLayout image={Image}>
      <h1 className={styles.title}>Create Account</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <TextInput label="First Name" inlineLabel value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextInput label="Last Name" inlineLabel value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <TextInput label="Email" inlineLabel type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label="Password" inlineLabel value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordInput label="Confirm Password" inlineLabel value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <DateInput label="Date of Birth" inlineLabel value={dateOfBirth} onChange={setDateOfBirth} />
        <GenderInput label="Gender" inlineLabel value={gender} onChange={setGender} />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className={styles.footerText}>
        Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
      </p>
    </BoxLayout>
  );
};

export default SignupPage;
