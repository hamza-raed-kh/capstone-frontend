import styles from "./Button.module.css";

/**
 * A customizable button component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the button, allowing for a consistent look and feel across the application.
 * 
 * @param {object} props - The properties for the button.
 * @param {'primary' | 'secondary' | 'red' | 'disabled' | 'green' | 'red-secondary' | 'golden' | 'bronze' | 'silver'} [props.variant='primary'] - The visual variant of the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button element.
 */
export const Button = ({ variant = "primary", type = "button", children, onClick }) => {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
