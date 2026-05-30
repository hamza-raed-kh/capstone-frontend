import React from 'react';
import { useSelector } from 'react-redux';
import NavLink from '../NavLink/NavLink';
import styles from './Navigation.module.css';
import Icon from '@/components/ui/Icon/Icon';
import { selectIsStaff } from '@/features/user/userSlice';

const PRESETS = {
  home: [
    { label: "Discover", to: "/explore", icon: "material-symbols:explore-rounded" },
    { label: "My Events", to: "/events", icon: "ph:trophy-fill" },
    { label: "My Applications", to: "/applications", icon: "material-symbols:list-alt-outline" },
    { label: "History", to: "/history", icon: "material-symbols:history-rounded" },
  ],
  account: [
    { label: "Account", to: "/account/profile", icon: "material-symbols-light:person-rounded" },
    { label: "Following", to: "/account/following", icon: "ic:round-people" },
    { label: "Security", to: "/account/security", icon: "iconamoon:shield-yes-fill" },
    { label: "Preferences", to: "/account/preferences", icon: "mdi:gear" },
    { label: "Organizer Center", to: "/organizer", icon: "fluent:calendar-24-filled" },
  ],
  admin: [
    { label: "Dashboard", to: "/manage/dashboard", icon: "uis:chart" },
    { label: "Draft Submissions", to: "/manage/draft-submissions", icon: "fluent:calendar-24-filled" },
    { label: "Change Requests", to: "/manage/edit-requests", icon: "mage:edit-pen-fill" },
  ],
};

function getOrganizerLinks(competitionId, hasBackLink) {
  if (!competitionId) {
    const links = [];
    if (!hasBackLink) {
      links.push({ label: "Organizer Center", to: "/organizer", icon: "fluent:calendar-24-filled" });
    }
    links.push({ label: "Create Competition", to: "/organizer/create", icon: "mage:edit-pen-fill" });
    return links;
  }
  return [
    { label: "Preview", to: `/organizer/${competitionId}/preview`, icon: "material-symbols:visibility-rounded", end: true },
    { label: "Form Management", to: `/organizer/${competitionId}/form`, icon: "mdi:form-outline" },
    { label: "Participant Management", to: `/organizer/${competitionId}/participants`, icon: "ic:round-people" },
    { label: "Statistics", to: `/organizer/${competitionId}/dashboard`, icon: "uis:chart" },
  ];
}

/**
 * Renders a list of navigation links with support for active and disabled states.
 * Selects from predefined preset configurations.
 *
 * @param {Object} props
 * @param {'home' | 'comunity' | 'account' | 'organizer' | 'admin'} [props.preset] - Configuration of preset links to use.
 * @param {(seperator_name): {Array<{lable: string, to: string, icon: string}>}} [props.community_link] - Non-preset links to be used in the case of community.
 */
const Navigation = ({ preset, community_links, backLink }) => {
  const competitionId = useSelector((state) => state.competition.currentId);
  const isStaff = useSelector(selectIsStaff);
  let activeLinks = preset === "organizer" ? getOrganizerLinks(competitionId, !!backLink) : preset !== "community" ? [...PRESETS[preset]] : [];
  if (preset === "account" && isStaff) {
    activeLinks.push({ label: "Admin Dashboard", to: "/manage/dashboard", icon: "uis:chart" });
  }

  if (preset === "admin") {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api/"
    const djangoAdminUrl = apiUrl.replace(/\/api\/?$/, "") + "/admin"
    activeLinks.push({ label: "Django Admin", to: djangoAdminUrl, icon: "mdi:gear" })
  }

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
              <div className={styles.separator} key={index}>
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
          (
            <>
              {backLink && (
                <NavLink
                  to={backLink.to}
                  label={backLink.label}
                  icon="mdi:arrow-left"
                  end={backLink.end}
                />
              )}
              {activeLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  label={link.label}
                  icon={link.icon}
                  disabled={link.disabled}
                  end={link.end}
                />
              ))}
            </>
          )}
      </ul>
    </nav>
  );
};

export default Navigation;
