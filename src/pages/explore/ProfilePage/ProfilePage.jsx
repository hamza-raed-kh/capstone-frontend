import { useNavigate, useParams } from "react-router-dom"
import { useGetMeQuery, useGetUserQuery } from "../../../features/api/authApi"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionHeader from "../../../components/ui/SectionHeader/SectionHeader"
import EventCard from "../../../components/data/EventCard/EventCard"
import CardGroup from "../../../components/data/CardGroup/CardGroup"
import styles from './ProfilePage.module.css'
import { Button } from '../../../components/inputs/Button/Button'

function ProfilePage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: me } = useGetMeQuery()
  const { data: user } = useGetUserQuery(Number(id), { skip: !id })

  const profile = id ? user : me

  const displayName = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.email
    : 'Loading...'

  const avatarUrl = profile?.profile_picture || 'https://i.pravatar.cc/150'

  const recentEvents = [
    {
      id: 1,
      variant: "main",
      info: { title: "Spring Festival 2026", description: "A great spring festival for all students." },
      details: { prize: "1st Place 500$", participants_now: 10, participants_max: 50, date_start: "Apr 20", date_end: "Apr 22", virtual: false, location: "Main Campus", categories: ["Social", "Fun"] },
      onClick: { view: () => navigate(`/competition/${1}`), approve: () => { }, reject: () => { } },
      button: { children: "1st", variant: "golden" }
    },
    {
      id: 2,
      variant: "main",
      info: { title: "Tech Symposium", description: "Discussing the latest in AI and Web Tech." },
      details: { prize: "N/A", participants_now: 100, participants_max: 200, date_start: "Apr 25", date_end: "Apr 25", virtual: true, location: "Online", categories: ["Tech", "Education"] },
      onClick: { view: () => navigate(`/competition/${2}`), approve: () => { }, reject: () => { } },
      button: { children: "2nd", variant: "silver" }
    },
    {
      id: 3,
      variant: "main",
      info: { title: "Tech Symposium", description: "Discussing the latest in AI and Web Tech." },
      details: { prize: "N/A", participants_now: 100, participants_max: 200, date_start: "Apr 25", date_end: "Apr 25", virtual: true, location: "Online", categories: ["Tech", "Education"] },
      onClick: { view: () => navigate(`/competition/${3}`), approve: () => { }, reject: () => { } },
      button: { children: "3rd", variant: "bronze" }
    },
    {
      id: 1,
      variant: "main",
      info: { title: "Spring Festival 2026", description: "A great spring festival for all students." },
      details: { prize: "1st Place 500$", participants_now: 10, participants_max: 50, date_start: "Apr 20", date_end: "Apr 22", virtual: false, location: "Main Campus", categories: ["Social", "Fun"] },
      onClick: { view: () => navigate(`/competition/${1}`), approve: () => { }, reject: () => { } },
      button: { children: "4th", variant: "disabled" }
    },
  ];

  return (
    <SectionedLayout preset="home">
      <div className={styles.container}>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <div className={styles.content}>
          <div className={styles.profileDetails}>
            <img className={styles.avatar} src={avatarUrl} alt={displayName} />
            <div className={styles.profileInfo}>
              <div className={styles.profileHeader}>
                <span className={styles.name}>{displayName}</span>
                {!id && <Button variant="secondary" onClick={() => navigate('/login')}>Follow</Button>}
              </div>
            </div>
          </div>
          <div className={styles.profileBio}>
            <h3>About Me</h3>
            {profile?.bio || 'This is a bio.'}
          </div>

          <CardGroup
            icon="material-symbols:history-rounded"
            title="Recent Activity"
            eventcards={recentEvents}
          />
        </div>
      </div>
    </SectionedLayout>
  )
}

export default ProfilePage
