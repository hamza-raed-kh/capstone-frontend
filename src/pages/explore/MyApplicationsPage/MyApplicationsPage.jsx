import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import FilterRow from "../../../components/data/FilterRow/FilterRow"
import Results from "../../../components/data/Results/Results"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import { useGetMeQuery } from "../../../features/api/authApi"
import { useGetTeamsQuery } from "../../../features/api/teamApi"
import { getMediaUrl } from "../../../utils/media"
import styles from './MyApplicationsPage.module.css'

const STATUS_BUTTON = {
  pending: { variant: "secondary", children: "Pending" },
  accepted: { variant: "green", children: "Accepted" },
  rejected: { variant: "red", children: "Rejected" },
}

function groupSection(event) {
  const now = new Date()
  const start = event.start_date ? new Date(event.start_date) : null
  const end = event.end_date ? new Date(event.end_date) : null

  if (event.status === "closed" || (end && end < now)) return "Ended"
  if (event.status === "open" && start && start > now) return "Upcoming"
  if (event.status === "open") return "Ongoing"
  return event.status.charAt(0).toUpperCase() + event.status.slice(1)
}

function mapTeamToCard(team, navigate) {
  const ev = team.event_detail
  return {
    variant: 'main',
    hideBanner: true,
    banner_url: getMediaUrl(ev.banner),
    info: {
      title: ev.title,
      description: `Team: ${team.name} — ${ev.description || "No description provided."}`,
    },
    details: {
      prize: ev.reward || "No prize",
      participants_now: "?",
      participants_max: ev.capacity ?? "No limit",
      date_start: ev.start_date ? format(ev.start_date, "MMM d") : "TBA",
      date_end: ev.end_date ? format(ev.end_date, "MMM d") : "TBA",
      virtual: !ev.location,
      location: ev.location || "Virtual",
      categories: [],
    },
    button: STATUS_BUTTON[team.status] || { variant: "primary", children: "View" },
    onClick: { view: () => navigate(`/competition/${ev.id}`) },
  }
}

function MyApplicationsPage() {
    const navigate = useNavigate()

    const { data: me } = useGetMeQuery()
    const { data: teamsData, isLoading } = useGetTeamsQuery({ user: me?.id }, { skip: !me?.id })

    const sections = useMemo(() => {
      const groups = {}
      ;(teamsData?.results || []).forEach((team) => {
        const ev = team.event_detail
        if (!ev) return
        const section = groupSection(ev)
        if (!groups[section]) groups[section] = []
        groups[section].push(mapTeamToCard(team, navigate))
      })

      const order = ["Ongoing", "Upcoming", "Ended"]
      const result = []
      for (const key of order) {
        if (groups[key]?.length) {
          result.push({ icon: "", title: key, category: "", eventcards: groups[key] })
        }
      }
      for (const key of Object.keys(groups)) {
        if (!order.includes(key)) {
          result.push({ icon: "", title: key, category: "", eventcards: groups[key] })
        }
      }
      return result
    }, [teamsData, navigate])

    return (
        <SectionedLayout preset="home">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.pageFiltersSection}>
                    <FilterRow />
                </div>
                <div className={styles.pageResultsSection}>
                    {isLoading ? <div>Loading...</div> : <Results variant={'cardgroups'} sections={sections} />}
                </div>
            </div>
        </SectionedLayout>
    )
}

export default MyApplicationsPage
