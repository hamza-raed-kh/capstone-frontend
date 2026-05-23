import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../features/api/authApi';
import { apiSlice } from '../../../features/api/apiSlice';
import { setTokens } from '../../../features/user/userSlice';
import BoxLayout from '../../../layouts/BoxLayout/BoxLayout';
import TextInput from '../../../components/inputs/TextInput/TextInput';
import PasswordInput from '../../../components/inputs/PasswordInput/PasswordInput';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.data) {
      dispatch(setTokens({ access: result.data.access, refresh: result.data.refresh }));
      dispatch(apiSlice.util.invalidateTags(['User']));
      navigate('/admin/dashboard');
    }
  };

  return (
    <BoxLayout>
      <h1 className={styles.title}>Login to Admin Center</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput label="Email" inlineLabel type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label="Password" inlineLabel value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && (
          <p className={styles.error}>
            {error?.data?.detail || 'Login failed. Please try again.'}
          </p>
        )}

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </BoxLayout>
  );
};

export default AdminLoginPage;
