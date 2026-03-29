import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * A versatile and reusable button component that serves as the primary UI for user interaction.
 * It can be customized with different sizes, background colors, and styles to fit various contexts.
 * The component's appearance can be toggled between a primary and secondary style.
 *
 * @param {object} props - The properties for the button.
 * @param {boolean} [props.primary=false] - Determines if the button should have the primary style.
 * @param {string} [props.backgroundColor=null] - The background color of the button.
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - The size of the button.
 * @param {string} props.label - The text to be displayed inside the button.
 * @param {Function} [props.onClick] - An optional click handler for the button.
 * @returns {JSX.Element} The rendered button element.
 */
export const Button = ({
  primary = false,
  backgroundColor = null,
  size = 'medium',
  label,
  ...props
}) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Determines if the button is the principal call to action on the page.
   * When `true`, the button will have a more prominent style.
   */
  primary: PropTypes.bool,
  /**
   * A custom background color to be applied to the button.
   * This can be any valid CSS color string.
   */
  backgroundColor: PropTypes.string,
  /**
   * Specifies the size of the button, which can be `small`, `medium`, or `large`.
   * The default size is `medium`.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The text content to be displayed inside the button. This is a required prop.
   */
  label: PropTypes.string.isRequired,
  /**
   * An optional function that will be called when the button is clicked.
   */
  onClick: PropTypes.func,
};

