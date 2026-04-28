import React from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './Navigation.module.css';
import Icon from '../Icon/Icon';

const PRESETS = {
  home: [
    { label: "Discover", to: "/explore", icon: "material-symbols:explore-rounded" },
    { label: "Following", to: "/following", icon: "ic:round-people" },
    { label: "My Events", to: "/events", icon: "ph:trophy-fill" },
    { label: "My Applications", to: "/applications", icon: "material-symbols:list-alt-outline" },
    { label: "History", to: "/history", icon: "material-symbols:history-rounded" },
  ],
  account: [
    { label: "Account", to: "/account/profile", icon: "ic:round-people" },
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
 * @param {'home' | 'comunity' | 'account' | 'organizer' | 'admin'} [props.preset] - Configuration of preset links to use.
 * @param {(seperator_name): {Array<{lable: string, to: string, icon: string}>}} [props.community_link] - Non-preset links to be used in the case of community.
 */
const Navigation = ({ preset, community_links }) => {
  const activeLinks = PRESETS[preset];

  community_links = community_links || {
    official: [
      { label: "Announcements", to: "/community/announcements", icon: "fluent:megaphone-24-filled" },
      { label: "FAQ", to: "/community/faq", icon: "material-symbols:question-mark-rounded" },
    ],
    private: [
      { label: "Organizer DM", to: "/community/dm", icon: "material-symbols:lock" },
      { label: "Team Chat", to: "/community/teamchat", icon: "material-symbols:lock" },
    ],
    event: [
      { label: "General", to: "/community/general", icon: "tabler:hash" },
    ],
    public: [
      { label: "General", to: "/community/public", icon: "tabler:hash" },
    ],
  }

  return (
    <nav className={styles.navWrapper}>
      {preset === "community" &&
        <div className={styles.navCommunityHeader}>
          <div className={styles.navCommunityIcon}>
            <Icon icon="fluent:chat-24-filled" size={24} />
          </div>
          <span className={styles.navCommunityText}>Channels</span>
        </div>
      }
      <ul className={styles.navList}>
        {preset === "community" ?
          (Object.entries(community_links).map(([category, links], index) => (
            <>
              <div className={styles.separator}>
                {category} <hr className={styles.separatorLine} />
              </div>
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  label={link.label}
                  icon={link.icon}
                  disabled={link.disabled}
                />
              ))}
            </>
          ))) :
          (activeLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              label={link.label}
              icon={link.icon}
              disabled={link.disabled}
            />
          )))}
      </ul>
    </nav>
  );
};

export default Navigation;
