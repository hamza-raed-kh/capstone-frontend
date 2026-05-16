import React from 'react';
import { Link } from 'react-router-dom';
import BoxLayout from '../../../layouts/BoxLayout/BoxLayout';
import TextInput from '../../../components/inputs/TextInput/TextInput';
import PasswordInput from '../../../components/inputs/PasswordInput/PasswordInput';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  return (
    <BoxLayout>
      <h1 className={styles.title}>Login to Admin Center</h1>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <TextInput label="Email" inlineLabel type="email" />
        <PasswordInput label="Password" inlineLabel />
        <button type="submit" className={styles.submitButton}>Log In</button>
      </form>
    </BoxLayout>
  );
};

export default AdminLoginPage;
