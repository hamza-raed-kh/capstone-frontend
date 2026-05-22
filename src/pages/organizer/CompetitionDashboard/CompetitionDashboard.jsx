import Block from "@/components/ui/Block/Block"
import SearchBar from "@/components/ui/SearchBar/SearchBar"
import SectionedLayout from "@/layouts/SectionedLayout/SectionedLayout"
import PieChartStatistic from "@/components/charts/PieChartStatistic/PieChartStatistic"
import LineChartStatistic from "@/components/charts/LineChartStatistic/LineChartStatistic"
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader"
import BarChartStatistic from "@/components/charts/BarChartStatistic/BarChartStatistic"

import styles from './CompetitionDashboard.module.css'

function CompetitionDashboard() {
    let comp_name = "Web3 Hackathon";
    let teams = true;

    let participantsData = [
        { time: "January", value1: 186, value2: 118 },
        { time: "February", value1: 305, value2: 130 },
        { time: "May", value1: 29, value2: 12 },
        { time: "May", value1: 209, value2: 120 },
        { time: "February", value1: 305, value2: 130 },
        { time: "May", value1: 209, value2: 120 },
        { time: "June", value1: 214, value2: 121 },
        { time: "January", value1: 186, value2: 118 },
        { time: "June", value1: 214, value2: 121 },
        { time: "January", value1: 186, value2: 118 },
        { time: "March", value1: 237, value2: 123 },
        { time: "April", value1: 73, value2: 17 },
        { time: "February", value1: 305, value2: 130 },
        { time: "April", value1: 73, value2: 17 },
        { time: "May", value1: 29, value2: 12 },
        { time: "April", value1: 73, value2: 17 },
        { time: "May", value1: 29, value2: 12 },
        { time: "May", value1: 209, value2: 120 },
        { time: "June", value1: 214, value2: 121 },
    ];
    let prticipantsConfig = {
        value1: {
            label: "Participants",
            color: "var(--color-text)",
        },
        value2: {
            label: "Teams",
            color: "var(--color-main)",
        },
    };
    let invitationsData = [
        { category: "approved", count: 275, fill: "var(--color-green)" },
        { category: "rejected", count: 200, fill: "var(--color-error)" },
        { category: "pending", count: 124, fill: "var(--color-text)" },
    ];
    let invitationsConfig = {
        count: {
            label: "status",
        },
        approved: {
            label: "Approved",
            // color: "var(--chart-1)",
        },
        rejected: {
            label: "Rejected",
            // color: "var(--chart-2)",
        },
        pending: {
            label: "Pending",
            // color: "var(--color-3)",
        },
    };
    let teamsData = [
        { group: "1 Members", quantity: 186 },
        { group: "2 Members", quantity: 305 },
        { group: "3 Members", quantity: 237 },
        { group: "4 Members", quantity: 73 },
        { group: "5 Members", quantity: 209 },
        { group: "6 Members", quantity: 214 },
    ];
    let teamsConfig = {
        quantity: {
            label: "Groups",
            color: "var(--color-main-accent)",
        },
    };

    return (
        <SectionedLayout preset="organizer">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{comp_name}</SearchBar>
                </div>
                <div className={styles.pageResultsSection}>
                    <Block>
                        <div className={styles.pageResultsContainer}>
                            <SectionHeader icon={'uis:chart'} title="Staistics"/>
                            <div className={styles.pageStatisticsGrid}>
                                {/* Participants Count (TimeCharts):
                                <ul>
                                    <li>
                                        X: Time 
                                        (marks: event(publish-date, start-date, end-date))
                                        (value: team(date-created))
                                    </li>
                                    <li>
                                        Y: Participants & Teams
                                        (marks: event(capacity))
                                        (value: team(date-created[sum]))
                                        <ul>
                                        <li>
                                            Y1: participants
                                            (variants: event_invitation(user-email))
                                        </li>
                                        <li>
                                            Y2: teams
                                            (variants: event_invitation(user-email))
                                        </li>
                                        </ul>
                                    </li>
                                </ul> */}
                                <LineChartStatistic
                                    title={'Participants Count'}
                                    desc={'Count of participants across time.'}
                                    chartData={participantsData}
                                    chartConfig={prticipantsConfig}
                                    footer={'Showing the number of active participants throughout the competition.'}
                                />
                                {/* Teams Count (BarCharts):
                                <ul>
                                    <li>
                                        X: Team size
                                        (columns: event(team-size-min, team-size-max))
                                    </li>
                                    <li>
                                        Y: Participants & Teams
                                        (value: team(members-count[sum]))
                                    </li>
                                </ul> */}
                                <PieChartStatistic
                                    title={'Invitations Status'}
                                    desc={'Status of Invitations sent for this competion.'}
                                    chartData={invitationsData}
                                    chartConfig={invitationsConfig}
                                    footer={'Showing total count for the time since publishing.'}
                                />
                                { teams && <>
                                    {/* Invitations Count (PieCharts):
                                    <ul>
                                    <li>
                                    X: Status 
                                    (pies: invitation(status))
                                    </li>
                                    <li>
                                    Y: Invittions
                                    (value: invitation(status[count]))
                                    </li>
                                    </ul> */}
                                    <BarChartStatistic
                                        title={'Teams Count'}
                                        desc={'Count of teams of with each number of members.'}
                                        chartData={ teamsData }
                                        chartConfig={ teamsConfig }
                                        footer={'Showing count of each team category that exists currently.'}
                                    />
                                </>}
                            </div>
                        </div>
                    </Block>
                </div>
            </div>
        </SectionedLayout>
    )
}

export default CompetitionDashboard
