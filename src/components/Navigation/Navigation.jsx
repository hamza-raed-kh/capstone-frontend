import React from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './Navigation.module.css';

const PRESETS = {
  home: [
    { label: "Discover", to: "/explore", icon: "material-symbols:explore-rounded" },
    { label: "Following", to: "/following", icon: "ic:round-people" },
    { label: "My Events", to: "/events", icon: "ph:trophy-fill" },
    { label: "My Applications", to: "/applications", icon: "material-symbols:list-alt-outline" },
    { label: "History", to: "/history", icon: "material-symbols:history-rounded" },
  ],
  account: [
    { label: "Account", to: "/account", icon: "ic:round-people" },
    { label: "Security", to: "/account/security", icon: "iconamoon:shield-yes-fill" },
    { label: "Preferences", to: "/account/preferences", icon: "mdi:gear" },
    { label: "Organizer Center", to: "/organizer", icon: "fluent:calendar-24-filled" },
  ],
  organizer: [
    { label: "Create", to: "/organizer/create", icon: "mage:edit-pen-fill" },
    { label: "Form Management", to: "/organizer/forms", icon: "mdi:form-outline" },
    { label: "Participant Management", to: "/organizer/participants", icon: "ic:round-people" },
    { label: "Statistics", to: "/organizer/statistics", icon: "uis:chart" },
  ],
  admin: [
    { label: "Dashboard", to: "/admin", icon: "uis:chart" },
    { label: "Draft Submissions", to: "/manage/draft-submissions", icon: "fluent:calendar-24-filled" },
    { label: "Edit Requests", to: "/manage/edit-requests", icon: "mage:edit-pen-fill" },
    { label: "Django Admin", to: "/admin", icon: "mdi:gear" },
  ],
};

/**
 * Renders a list of navigation links with support for active and disabled states.
 * Selects from predefined preset configurations.
 *
 * @param {Object} props
 * @param {string} [props.preset] - Configuration preset to use (e.g., 'main', 'preset2').
 */
const Navigation = ({ preset }) => {
  const activeLinks = PRESETS[preset];

  return (
    <nav className={styles.navWrapper}>
      <ul className={styles.navList}>
        {activeLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            label={link.label}
            icon={link.icon}
            disabled={link.disabled}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
