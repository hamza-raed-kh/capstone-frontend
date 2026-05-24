import Block from "@/components/ui/Block/Block"
import PieChartStatistic from "@/components/charts/PieChartStatistic/PieChartStatistic"
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader"
import BarChartStatistic from "@/components/charts/BarChartStatistic/BarChartStatistic"
import AdminLayout from "@/layouts/AdminLayout/AdminLayout"

import styles from './AdminDashboard.module.css'

function AdminDashboard() {
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
        },
        rejected: {
            label: "Rejected",
        },
        pending: {
            label: "Pending",
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
        },
        rejected: {
            label: "Rejected",
        },
        pending: {
            label: "Pending",
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
        <AdminLayout pageName="Dashboard">
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
        </AdminLayout>
    );
}

export default AdminDashboard
