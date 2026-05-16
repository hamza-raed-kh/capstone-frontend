import React from 'react';
import { Link } from 'react-router-dom';
import BoxLayout from '../../../layouts/BoxLayout/BoxLayout';
import TextInput from '../../../components/inputs/TextInput/TextInput';
import PasswordInput from '../../../components/inputs/PasswordInput/PasswordInput';
import styles from './LoginPage.module.css';
import Image from '../../../assets/Login Page Illustration.png';

const LoginPage = () => {
  return (
    <BoxLayout image={Image}>
      <h1 className={styles.title}>Welcome back!</h1>
      {/* <p className={styles.subtitle}>Log in to continue to Sanfoor Arena</p> */}

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <TextInput label="Email" inlineLabel type="email" />
        <PasswordInput label="Password" inlineLabel />

        {/* <div className={styles.options}>
          <CheckboxInput label="Remember me" variant="primary" />
          <Link to="#" className={styles.forgotLink}>Forgot Password?</Link>
        </div> */}

        <button type="submit" className={styles.submitButton}>Log In</button>
      </form>

      <p className={styles.footerText}>
        Don't have an account? <Link to="/signup" className={styles.link}>Sign up</Link>
      </p>
    </BoxLayout>
  );
};

export default LoginPage;
