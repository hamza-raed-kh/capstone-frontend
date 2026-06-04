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
import styles from './HistoryPage.module.css'

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

const RANK_BUTTON = {
  1: { variant: "golden", children: ordinal(1) },
  2: { variant: "silver", children: ordinal(2) },
  3: { variant: "bronze", children: ordinal(3) },
}

function isEnded(event) {
  if (event.status === "closed") return true
  if (event.end_date && new Date(event.end_date) < new Date()) return true
  return false
}

function mapTeamToCard(team, navigate) {
  const ev = team.event_detail
  const rank = team.ranking
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
    button: RANK_BUTTON[rank] || { variant: "disabled", children: ordinal(rank) },
    onClick: { view: () => navigate(`/competition/${ev.id}`) },
  }
}

function HistoryPage() {
    const navigate = useNavigate()

    const { data: me } = useGetMeQuery()
    const { data: teamsData, isLoading } = useGetTeamsQuery({ user: me?.id }, { skip: !me?.id })

    const sections = useMemo(() => {
      const ended = []
      ;(teamsData?.results || []).forEach((team) => {
        const ev = team.event_detail
        if (!ev || !isEnded(ev)) return
        ended.push(mapTeamToCard(team, navigate))
      })

      const result = []
      if (ended.length) {
        result.push({ icon: "", title: "Ended", category: "", eventcards: ended })
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

export default HistoryPage
