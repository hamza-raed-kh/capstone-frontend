import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './Navigation.module.css';

/**
 * Renders a list of navigation links with support for active and disabled states.
 * Uses .module.css for styling as requested.
 *
 * @param {Object} props
 * @param {Array<{to: string, label: string, icon?: string, disabled?: boolean}>} props.links - Array of navigation link objects.
 */
const Navigation = ({ links = [] }) => {
  return (
    <nav className={styles.navWrapper}>
      <ul className={styles.navList}>
        {links.map((link, index) => {
          if (link.disabled) {
            return (
              <li key={index} className={styles.navItemDisabled}>
                <div className={styles.linkContent}>
                  {link.icon && <Icon icon={link.icon} className={styles.linkIcon} />}
                  <span className={styles.linkLabel}>{link.label}</span>
                </div>
              </li>
            );
          }

          return (
            <li key={index} className={styles.navItem}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                {link.icon && <Icon icon={link.icon} className={styles.linkIcon} />}
                <span className={styles.linkLabel}>{link.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
