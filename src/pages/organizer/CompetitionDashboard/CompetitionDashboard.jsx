import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentCompetition, clearCurrentCompetition } from "@/features/competition/competitionSlice"
import Block from "@/components/ui/Block/Block"
import SearchBar from "@/components/ui/SearchBar/SearchBar"
import PieChartStatistic from "@/components/charts/PieChartStatistic/PieChartStatistic"
import LineChartStatistic from "@/components/charts/LineChartStatistic/LineChartStatistic"
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader"
import BarChartStatistic from "@/components/charts/BarChartStatistic/BarChartStatistic"
import { useGetEventQuery } from "@/features/api/eventApi"
import { useGetTeamsQuery } from "@/features/api/teamApi"

import styles from './CompetitionDashboard.module.css'

function CompetitionDashboard() {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])

    const { data: event } = useGetEventQuery(Number(id))
    const { data: teamsData } = useGetTeamsQuery(
        { event: id, page_size: 1000 },
        { skip: !id }
    )

    const teams = useMemo(() => teamsData?.results || [], [teamsData])

    const statusCounts = useMemo(() => {
        const counts = { draft: 0, pending: 0, accepted: 0, rejected: 0 }
        teams.forEach(t => {
            if (counts[t.status] !== undefined) counts[t.status]++
        })
        return counts
    }, [teams])

    const pieChartData = [
        { category: "accepted", count: statusCounts.accepted, fill: "var(--color-green)" },
        { category: "rejected", count: statusCounts.rejected, fill: "var(--color-error)" },
        { category: "pending", count: statusCounts.pending, fill: "var(--color-prize)" },
        { category: "draft", count: statusCounts.draft, fill: "var(--color-text)" },
    ].filter(d => d.count > 0)

    const pieConfig = {
        count: { label: "teams" },
        accepted: { label: "Accepted" },
        rejected: { label: "Rejected" },
        pending: { label: "Pending" },
        draft: { label: "Draft" },
    }

    const sizeDistribution = useMemo(() => {
        const dist = {}
        teams.forEach(t => {
            const size = t.members_count
            dist[size] = (dist[size] || 0) + 1
        })
        return Object.entries(dist)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([size, count]) => ({
                group: `${size} Member${Number(size) !== 1 ? "s" : ""}`,
                quantity: count,
            }))
    }, [teams])

    const barConfig = {
        quantity: {
            label: "Teams",
            color: "var(--color-main-accent)",
        },
    }

    const lineChartData = useMemo(() => {
        const statuses = ["draft", "pending", "accepted", "rejected"]
        return statuses.map(status => {
            const statusTeams = teams.filter(t => t.status === status)
            return {
                time: status.charAt(0).toUpperCase() + status.slice(1),
                value1: statusTeams.reduce((sum, t) => sum + t.members_count, 0),
                value2: statusTeams.length,
            }
        })
    }, [teams])

    const lineConfig = {
        value1: {
            label: "Participants",
            color: "var(--color-text)",
        },
        value2: {
            label: "Teams",
            color: "var(--color-main)",
        },
    }

    const compName = event?.title || "Competition"

    return (
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{compName}</SearchBar>
                </div>
                <div className={styles.pageResultsSection}>
                    <Block>
                        <div className={styles.pageResultsContainer}>
                            <SectionHeader icon={'uis:chart'} title="Statistics"/>
                            <div className={styles.pageStatisticsGrid}>
                                <LineChartStatistic
                                    title={'Participants & Teams'}
                                    desc={'By team status'}
                                    chartData={lineChartData}
                                    chartConfig={lineConfig}
                                    footer={'Participants and teams grouped by application status.'}
                                />
                                <PieChartStatistic
                                    title={'Teams by Status'}
                                    desc={'Distribution of team applications'}
                                    chartData={pieChartData}
                                    chartConfig={pieConfig}
                                    footer={`${teams.length} team${teams.length !== 1 ? "s" : ""} total.`}
                                />
                                {sizeDistribution.length > 0 && (
                                    <BarChartStatistic
                                        title={'Team Size'}
                                        desc={'Number of members per team'}
                                        chartData={sizeDistribution}
                                        chartConfig={barConfig}
                                        footer={'Showing how many teams have each member count.'}
                                    />
                                )}
                            </div>
                        </div>
                    </Block>
                </div>
            </div>
    )
}

export default CompetitionDashboard
