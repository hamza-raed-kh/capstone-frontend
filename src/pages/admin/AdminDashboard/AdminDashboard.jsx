import Block from "@/components/Block/Block"
import SearchBar from "@/components/SearchBar/SearchBar"
import SectionedLayout from "@/layouts/SectionedLayout/SectionedLayout"
import PieChartStatistic from "@/components/charts/PieChartStatistic/PieChartStatistic"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import BarChartStatistic from "@/components/charts/BarChartStatistic/BarChartStatistic"

import styles from './AdminDashboard.module.css'

function AdminDashboard() {
    let comp_name = "Web3 Hackathon";

    let submissionPieData = [
        { category: "approved", count: 193, fill: "var(--color-green)" },
        { category: "rejected", count: 50, fill: "var(--color-error)" },
        { category: "pending", count: 220, fill: "var(--color-text)" },
    ];
    let submissionPieConfig = {
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
    let submissionBarData = [
        { group: "+1 Month", quantity: 186 },
        { group: "+1 Week", quantity: 305 },
        { group: "6-7 days", quantity: 237 },
        { group: "2-3 days", quantity: 209 },
        { group: "Today", quantity: 214 },
        { group: "6 hours", quantity: 214 },
    ];
    let submissionBarConfig = {
        quantity: {
            label: "Groups",
            color: "var(--color-main-accent)",
        },
    };
    let requestPieData = [
        { category: "approved", count: 300, fill: "var(--color-green)" },
        { category: "rejected", count: 129, fill: "var(--color-error)" },
        { category: "pending", count: 111, fill: "var(--color-text)" },
    ];
    let requestPieConfig = {
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
    let requestBarData = [
        { group: "+1 Month", quantity: 186 },
        { group: "+1 Week", quantity: 305 },
        { group: "6-7 days", quantity: 237 },
        { group: "2-3 days", quantity: 209 },
        { group: "Today", quantity: 214 },
        { group: "6 hours", quantity: 214 },
    ];
    let requestBarConfig = {
        quantity: {
            label: "Groups",
            color: "var(--color-main-accent)",
        },
    };

    return (
        <SectionedLayout preset="admin">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{comp_name}</SearchBar>
                </div>
                <div className={styles.pageResultsSection}>
                    <Block>
                        <div className={styles.pageResultsContainer}>
                            <SectionHeader icon={'fluent:calendar-24-filled'} title="Draft Submission Staistics"/>
                            <div className={styles.pageStatisticsGrid}>
                                <PieChartStatistic
                                    title={'Submissions Status'}
                                    desc={'Status of Draft Submissions sent to admin.'}
                                    chartData={submissionPieData}
                                    chartConfig={submissionPieConfig}
                                    footer={'Showing status of all pending drafts & those resolved today.'}
                                />
                                <BarChartStatistic
                                    title={'Submissions waiting'}
                                    desc={'How long drafts have been waiting in Submission.'}
                                    chartData={ submissionBarData }
                                    chartConfig={ submissionBarConfig }
                                    footer={'Showing all pending Submissions at the moment.'}
                                />
                            </div>
                            <SectionHeader icon={'mage:edit-pen-fill'} title="Change Request Staistics"/>
                            <div className={styles.pageStatisticsGrid}>
                                <PieChartStatistic
                                    title={'Change Reqs Status'}
                                    desc={'Status of Change Requests sent to admin.'}
                                    chartData={requestPieData}
                                    chartConfig={requestPieConfig}
                                    footer={'Showing status of all pending requests & those resolved today.'}
                                />
                                <BarChartStatistic
                                    title={'Request waiting'}
                                    desc={'How long Change Reqs have been waiting in submission.'}
                                    chartData={ requestBarData }
                                    chartConfig={ requestBarConfig }
                                    footer={'Showing all pending Change Reqs at the moment.'}
                                />
                            </div>
                        </div>
                    </Block>
                </div>
            </div>
        </SectionedLayout>
    );
}

export default AdminDashboard
