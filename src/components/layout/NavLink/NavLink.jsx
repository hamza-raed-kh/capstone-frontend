import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import Icon from '@/components/ui/Icon/Icon';
import styles from './NavLink.module.css';

const NavLink = ({ to, label, icon, disabled, end }) => {
  const isExternal = typeof to === "string" && to.startsWith("http")

  if (disabled) {
    return (
      <li className={styles.navItemDisabled}>
        <div className={styles.linkContent}>
          {icon && <Icon icon={icon} className={styles.linkIcon} />}
          <span className={styles.linkLabel}>{label}</span>
        </div>
      </li>
    );
  }

  if (isExternal) {
    return (
      <li className={styles.navItem}>
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {icon && <Icon icon={icon} className={styles.linkIcon} />}
          <span className={styles.linkLabel}>{label}</span>
        </a>
      </li>
    );
  }

  return (
    <li className={styles.navItem}>
      <RouterNavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.linkActive}` : styles.link
        }
      >
        {icon && <Icon icon={icon} className={styles.linkIcon} />}
        <span className={styles.linkLabel}>{label}</span>
      </RouterNavLink>
    </li>
  );
};

export default NavLink;
