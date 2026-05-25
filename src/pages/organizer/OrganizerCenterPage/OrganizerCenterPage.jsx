import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import FilterRow from "../../../components/data/FilterRow/FilterRow"
import Results from "../../../components/data/Results/Results"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import { Button } from "../../../components/inputs/Button/Button"
import { useGetMeQuery } from "../../../features/api/authApi"
import { useGetEventsQuery } from "../../../features/api/eventApi"
import styles from './OrganizerCenterPage.module.css'

function getStatusGroup(status) {
  switch (status) {
    case "draft": return "Drafts"
    case "pending": return "Under Review"
    case "open": return "Ongoing"
    case "closed": return "Ended"
    default: return null
  }
}

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
    button: { variant: "primary", children: "Preview" },
    onClick: { view: () => navigate(`/organizer/${event.id}/preview`) },
  }
}

function OrganizerCenterPage() {
    const navigate = useNavigate()
    const { data: me } = useGetMeQuery()
    const userId = me?.id
    const { data, isLoading } = useGetEventsQuery(
      { organizer: userId },
      { skip: !userId }
    )

    const groups = {}
    const results = data?.results || []
    for (const ev of results) {
      const group = getStatusGroup(ev.status)
      if (!group) continue
      if (!groups[group]) groups[group] = []
      groups[group].push(mapEventToCard(ev, navigate))
    }

    if (results.length > 0) {
      if (!groups["Drafts"]) groups["Drafts"] = []
      groups["Drafts"].push({
        variant: 'create',
        onClick: { view: () => navigate('/organizer/create') },
      })
    }

    const sectionOrder = ["Ongoing", "Under Review", "Drafts", "Ended"]
    const sections = sectionOrder
      .filter((name) => groups[name]?.length)
      .map((name) => ({
        icon: '',
        title: name,
        category: '',
        eventcards: groups[name],
      }))

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageSearchSection}>
                <SearchBar />
            </div>
            <div className={styles.pageFiltersSection}>
                <FilterRow />
            </div>
            <div className={styles.pageResultsSection}>
                {isLoading ? <div>Loading...</div> : results.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h2>No competitions yet</h2>
                        <p>Create your first competition to get started.</p>
                        <Button variant="primary" onClick={() => navigate('/organizer/create')}>Create Competition</Button>
                    </div>
                ) : <Results variant={'cardgroups'} sections={sections} />}
            </div>
        </div>
    )
}

export default OrganizerCenterPage
