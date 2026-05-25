import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { useSelector } from "react-redux"
import FilterRow from "../../../components/data/FilterRow/FilterRow"
import Results from "../../../components/data/Results/Results"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import { useGetEventsQuery } from "../../../features/api/eventApi"
import { useGetMeQuery } from "../../../features/api/authApi"
import { useGetTeamsQuery } from "../../../features/api/teamApi"
import styles from './EventsPage.module.css'

function mapEventToCard(event, navigate) {
  return {
    variant: 'main',
    banner_url: event.banner || `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80`,
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
    onClick: { view: () => navigate(`/competition/${event.id}`) },
  }
}

function EventsPage() {
    const navigate = useNavigate()
    const filters = useSelector((state) => state.filters)

    const { data: me } = useGetMeQuery()
    const { data: teamsData } = useGetTeamsQuery({ user: me?.id }, { skip: !me?.id })

    const queryParams = {}
    if (filters.search) queryParams.search = filters.search
    if (filters.afterDate) queryParams.start_date__gte = filters.afterDate.split("T")[0]
    if (filters.beforeDate) queryParams.end_date__lte = filters.beforeDate.split("T")[0]
    if (filters.virtual) queryParams.virtual = "true"
    if (filters.topics.length) queryParams.topics = filters.topics.join(",")

    const { data, isLoading } = useGetEventsQuery(queryParams)

    const myEventIds = useMemo(() => {
      if (!teamsData?.results) return new Set()
      return new Set(teamsData.results.map((t) => t.event))
    }, [teamsData])

    const { ongoing, upcoming } = useMemo(() => {
      const now = new Date()
      const on = []
      const up = []
      ;(data?.results || []).forEach((ev) => {
        if (!myEventIds.has(ev.id)) return
        const card = mapEventToCard(ev, navigate)
        if (ev.start_date && new Date(ev.start_date) > now) {
          up.push(card)
        } else {
          on.push(card)
        }
      })
      return { ongoing: on, upcoming: up }
    }, [data, navigate, myEventIds])

    const sections = [
      ongoing.length && { icon: '', title: 'Ongoing', category: '', eventcards: ongoing },
      upcoming.length && { icon: '', title: 'Upcoming', category: '', eventcards: upcoming },
    ].filter(Boolean)

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

export default EventsPage
