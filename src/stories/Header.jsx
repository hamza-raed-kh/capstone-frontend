import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button';
import './header.css';

/**
 * A header component that displays a logo, title, and user-specific actions.
 * The header's content changes based on whether a user is logged in or not,
 * showing either a welcome message and a "Log out" button or "Log in" and "Sign up" buttons.
 *
 * @param {object} props - The properties for the header.
 * @param {object} [props.user=null] - The user object, which contains user details.
 * @param {string} props.user.name - The name of the user.
 * @param {Function} props.onLogin - The function to be called when the "Log in" button is clicked.
 * @param {Function} props.onLogout - The function to be called when the "Log out" button is clicked.
 * @param {Function} props.onCreateAccount - The function to be called when the "Sign up" button is clicked.
 * @returns {JSX.Element} The rendered header element.
 */
export const Header = ({ user = null, onLogin, onLogout, onCreateAccount }) => (
  <header>
    <div className="storybook-header">
      <div>
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path
              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
              fill="#FFF"
            />
            <path
              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
              fill="#555AB9"
            />
            <path
              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
              fill="#91BAF8"
            />
          </g>
        </svg>
        <h1>Acme</h1>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  /**
   * The user object containing the details of the logged-in user.
   * If `null`, the header will display "Log in" and "Sign up" buttons.
   */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  /**
   * The function to be called when the "Log in" button is clicked.
   */
  onLogin: PropTypes.func.isRequired,
  /**
   * The function to be called when the "Log out" button is clicked.
   */
  onLogout: PropTypes.func.isRequired,
  /**
   * The function to be called when the "Sign up" button is clicked.
   */
  onCreateAccount: PropTypes.func.isRequired,
};

