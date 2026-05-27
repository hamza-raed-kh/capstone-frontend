import { useState } from "react"
import { format } from "date-fns"
import { useNavigate, useParams, Navigate } from "react-router-dom"
import { useGetMeQuery, useGetUserQuery } from "../../../features/api/authApi"
import { 
	useUnfollowUserMutation,
	useFollowUserMutation,
	useGetFollowedQuery
} from "../../../features/api/followApi"
import { useGetParticipatedEventsQuery } from "../../../features/api/eventApi"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import CardGroup from "../../../components/data/CardGroup/CardGroup"
import Icon from "../../../components/ui/Icon/Icon"
import styles from './ProfilePage.module.css'
import { Button } from '../../../components/inputs/Button/Button'
import { useCallback } from "react"

function mapEventToCard(event, navigate) {
  return {
	variant: 'main',
	banner_url: event.banner,
	info: {
	  title: event.title,
	  description: event.description || "No description provided.",
	},
	details: {
	  prize: event.reward || "No prize",
	  participants_now: "?",
	  participants_max: event.capacity ?? "No limit",
	  date_start: event.start_date ? format(event.start_date, "MMM d") : "TBA",
	  date_end: event.end_date ? format(event.end_date, "MMM d") : "TBA",
	  virtual: !event.location,
	  location: event.location || "Virtual",
	  categories: [],
	},
	button: { variant: "primary", children: "Apply" },
	onClick: {
		view: () => navigate(`/competition/${event.id}`),
		buttonLink: () => navigate(`/competition/${event.id}`, {
			state: {
				applicationModal: 'open',
			}
		}),
	},
  }
}

function ProfilePage() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [imgError, setImgError] = useState(false)

	const { data: me } = useGetMeQuery()
	const { data: user, error: userError } = useGetUserQuery(Number(id), { skip: !id })
	const { data: followed } = useGetFollowedQuery(Number(id), { skip: !id })
	const { data: events } = useGetParticipatedEventsQuery(Number(id))
	const [unfollowUser] = useUnfollowUserMutation();
	const [followUser] = useFollowUserMutation();
  
	const handleFollow = useCallback((userId) => {
		if (userId) followUser(userId)
	}, [followUser]);
  
	const handleUnfollow = useCallback((userId) => {
		if (userId) unfollowUser(userId)
	}, [unfollowUser]);

	const profile = id ? user : me

	if (id && userError?.status === 404) {
		return <Navigate to="/404" replace />
	}

	const displayName = profile
		? [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.email
		: 'Loading...'

	const hasAvatar = profile?.profile_picture && !imgError

	// let recentEvents = events || [
	// 	// {
	// 	// 	id: 1,
	// 	// 	variant: "main",
	// 	// 	info: { title: "Spring Festival 2026", description: "A great spring festival for all students." },
	// 	// 	details: { prize: "1st Place 500$", participants_now: 10, participants_max: 50, date_start: "Apr 20", date_end: "Apr 22", virtual: false, location: "Main Campus", categories: ["Social", "Fun"] },
	// 	// 	onClick: { view: () => navigate(`/competition/${1}`), approve: () => { }, reject: () => { } },
	// 	// 	button: { children: "1st", variant: "golden" }
	// 	// },
	// 	// {
	// 	// 	id: 2,
	// 	// 	variant: "main",
	// 	// 	info: { title: "Tech Symposium", description: "Discussing the latest in AI and Web Tech." },
	// 	// 	details: { prize: "N/A", participants_now: 100, participants_max: 200, date_start: "Apr 25", date_end: "Apr 25", virtual: true, location: "Online", categories: ["Tech", "Education"] },
	// 	// 	onClick: { view: () => navigate(`/competition/${2}`), approve: () => { }, reject: () => { } },
	// 	// 	button: { children: "2nd", variant: "silver" }
	// 	// },
	// 	// {
	// 	// 	id: 3,
	// 	// 	variant: "main",
	// 	// 	info: { title: "Tech Symposium", description: "Discussing the latest in AI and Web Tech." },
	// 	// 	details: { prize: "N/A", participants_now: 100, participants_max: 200, date_start: "Apr 25", date_end: "Apr 25", virtual: true, location: "Online", categories: ["Tech", "Education"] },
	// 	// 	onClick: { view: () => navigate(`/competition/${3}`), approve: () => { }, reject: () => { } },
	// 	// 	button: { children: "3rd", variant: "bronze" }
	// 	// },
	// 	// {
	// 	// 	id: 1,
	// 	// 	variant: "main",
	// 	// 	info: { title: "Spring Festival 2026", description: "A great spring festival for all students." },
	// 	// 	details: { prize: "1st Place 500$", participants_now: 10, participants_max: 50, date_start: "Apr 20", date_end: "Apr 22", virtual: false, location: "Main Campus", categories: ["Social", "Fun"] },
	// 	// 	onClick: { view: () => navigate(`/competition/${1}`), approve: () => { }, reject: () => { } },
	// 	// 	button: { children: "4th", variant: "disabled" }
	// 	// },
	// ];
	const recentEvents = (events || []).map((ev) => mapEventToCard(ev, navigate))

	console.log('recentEvents: ', recentEvents);


	return (
		<SectionedLayout preset="home">
			<div className={styles.container}>
				<div className={styles.search}>
					<SearchBar />
				</div>
				<div className={styles.content}>
					<div className={styles.profileDetails}>
						{hasAvatar ? (
							<img
								className={styles.avatar}
								src={profile.profile_picture}
								alt={displayName}
								onError={() => setImgError(true)}
							/>
						) : (
							<div className={styles.avatarPlaceholder}>
								<Icon icon="mdi:account-circle" size={72} />
							</div>
						)}
						<div className={styles.profileInfo}>
							<div className={styles.profileHeader}>
								<span className={styles.name}>{displayName}</span>
								{id?
					(followed?.is_followed?
						<Button variant="secondary" onClick={() => handleUnfollow(id)}>Unfollow</Button>:
						<Button variant="secondary" onClick={() => handleFollow(id)}>Follow</Button>
					):
					<Button variant="secondary" onClick={() => navigate('/account/profile')}>Edit</Button>
				}
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
