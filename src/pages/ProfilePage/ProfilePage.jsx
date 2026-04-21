import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import SearchBar from "../../components/SearchBar/SearchBar"
import SectionHeader from "../../components/SectionHeader/SectionHeader"
import EventCard from "../../components/EventCard/EventCard"
import styles from './ProfilePage.module.css'
import { Button } from '../../components/inputs/Button/Button'

function ProfilePage() {
  const profile = {
    avatar: 'https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4',
    name: 'Hamza Khattab',
    year: '2004'
  }

  const recentEvents = [
    {
      id: 1,
      variant: "main",
      info: { title: "Spring Festival 2026", description: "A great spring festival for all students." },
      details: { prize: "1st Place 500$", participants_now: 10, participants_max: 50, date_start: "Apr 20", date_end: "Apr 22", virtual: false, location: "Main Campus", categories: ["Social", "Fun"] },
      onClick: { view: () => { }, approve: () => { }, reject: () => { } },
      button: { children: "1st", variant: "golden" }
    },
    {
      id: 2,
      variant: "main",
      info: { title: "Tech Symposium", description: "Discussing the latest in AI and Web Tech." },
      details: { prize: "N/A", participants_now: 100, participants_max: 200, date_start: "Apr 25", date_end: "Apr 25", virtual: true, location: "Online", categories: ["Tech", "Education"] },
      onClick: { view: () => { }, approve: () => { }, reject: () => { } },
      button: { children: "2nd", variant: "silver" }
    },
    {
      id: 3,
      variant: "main",
      info: { title: "Tech Symposium", description: "Discussing the latest in AI and Web Tech." },
      details: { prize: "N/A", participants_now: 100, participants_max: 200, date_start: "Apr 25", date_end: "Apr 25", virtual: true, location: "Online", categories: ["Tech", "Education"] },
      onClick: { view: () => { }, approve: () => { }, reject: () => { } },
      button: { children: "3rd", variant: "bronze" }
    },
    {
      id: 1,
      variant: "main",
      info: { title: "Spring Festival 2026", description: "A great spring festival for all students." },
      details: { prize: "1st Place 500$", participants_now: 10, participants_max: 50, date_start: "Apr 20", date_end: "Apr 22", virtual: false, location: "Main Campus", categories: ["Social", "Fun"] },
      onClick: { view: () => { }, approve: () => { }, reject: () => { } },
      button: { children: "4th", variant: "disabled" }
    },
  ];

  return (
    <SectionedLayout preset="account">
      <div className={styles.container}>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <div className={styles.content}>
          <div className={styles.profileDetails}>
            <img className={styles.avatar} src={profile.avatar} alt={profile.name} />
            <div className={styles.profileInfo}>
              <div className={styles.profileHeader}>
                <span className={styles.name}>{profile.name}</span>
                <Button variant="secondary">Follow</Button>
              </div>
              <span className={styles.year}>
                <span className={styles.smurf}>
                  Smurf
                </span>
                <span className={styles.ofYear}>
                  of {profile.year}
                </span>
              </span>
            </div>
          </div>
          <div className={styles.profileBio}>
            <h3>About Me</h3>
            This is a bio.
          </div>

          <SectionHeader
            icon="material-symbols:history-rounded"
            text="Recent Activity"
          />

          <div className={styles.eventList}>
            {recentEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>
    </SectionedLayout>
  )
}

export default ProfilePage
