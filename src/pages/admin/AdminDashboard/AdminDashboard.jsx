import { useMemo } from "react"
import { differenceInDays, parseISO } from "date-fns"
import Block from "@/components/ui/Block/Block"
import PieChartStatistic from "@/components/charts/PieChartStatistic/PieChartStatistic"
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader"
import BarChartStatistic from "@/components/charts/BarChartStatistic/BarChartStatistic"
import AdminLayout from "@/layouts/AdminLayout/AdminLayout"
import { useGetEventsQuery } from "@/features/api/eventApi"
import { useGetEditRequestsQuery } from "@/features/api/editRequestApi"

import styles from './AdminDashboard.module.css'

const BUCKET_ORDER = ["Today", "2-3 days", "6-7 days", "+1 Week", "+1 Month"]

function getAgeBucket(createdAt) {
    const days = differenceInDays(new Date(), parseISO(createdAt))
    if (days === 0) return "Today"
    if (days <= 3) return "2-3 days"
    if (days <= 7) return "6-7 days"
    if (days <= 30) return "+1 Week"
    return "+1 Month"
}

function AdminDashboard() {
    const { data: eventsData } = useGetEventsQuery({ page_size: 1000 })
    const { data: editReqsData } = useGetEditRequestsQuery({ page_size: 1000 })

    const events = useMemo(() => eventsData?.results || [], [eventsData])
    const editReqs = useMemo(() => editReqsData?.results || [], [editReqsData])

    const statusCounts = useMemo(() => {
        const counts = { draft: 0, pending: 0, open: 0, closed: 0 }
        events.forEach(e => {
            if (counts[e.status] !== undefined) counts[e.status]++
        })
        return counts
    }, [events])

    const submissionPieData = useMemo(() => [
        { category: "pending", count: statusCounts.pending, fill: "var(--color-prize)" },
        { category: "open", count: statusCounts.open, fill: "var(--color-green)" },
        { category: "closed", count: statusCounts.closed, fill: "var(--color-text)" },
        { category: "draft", count: statusCounts.draft, fill: "var(--color-error)" },
    ].filter(d => d.count > 0), [statusCounts])

    const submissionPieConfig = {
        count: { label: "events" },
        pending: { label: "Pending Review" },
        open: { label: "Approved" },
        closed: { label: "Ended" },
        draft: { label: "Draft" },
    }

    const submissionBarBuckets = useMemo(() => {
        const buckets = { "Today": 0, "2-3 days": 0, "6-7 days": 0, "+1 Week": 0, "+1 Month": 0 }
        events.filter(e => e.status === "pending").forEach(e => {
            const bucket = getAgeBucket(e.created_at)
            if (buckets[bucket] !== undefined) buckets[bucket]++
        })
        return Object.entries(buckets)
            .filter(([, c]) => c > 0)
            .sort(([a], [b]) => BUCKET_ORDER.indexOf(a) - BUCKET_ORDER.indexOf(b))
            .map(([group, quantity]) => ({ group, quantity }))
    }, [events])

    const submissionBarConfig = {
        quantity: { label: "Submissions", color: "var(--color-main-accent)" },
    }

    const requestStatusCounts = useMemo(() => {
        const counts = { pending: 0, approved: 0, rejected: 0 }
        editReqs.forEach(r => {
            if (counts[r.request_status] !== undefined) counts[r.request_status]++
        })
        return counts
    }, [editReqs])

    const requestPieData = useMemo(() => [
        { category: "pending", count: requestStatusCounts.pending, fill: "var(--color-prize)" },
        { category: "approved", count: requestStatusCounts.approved, fill: "var(--color-green)" },
        { category: "rejected", count: requestStatusCounts.rejected, fill: "var(--color-error)" },
    ].filter(d => d.count > 0), [requestStatusCounts])

    const requestPieConfig = {
        count: { label: "requests" },
        pending: { label: "Pending" },
        approved: { label: "Approved" },
        rejected: { label: "Rejected" },
    }

    const requestBarBuckets = useMemo(() => {
        const buckets = { "Today": 0, "2-3 days": 0, "6-7 days": 0, "+1 Week": 0, "+1 Month": 0 }
        editReqs.filter(r => r.request_status === "pending").forEach(r => {
            const bucket = getAgeBucket(r.created_at)
            if (buckets[bucket] !== undefined) buckets[bucket]++
        })
        return Object.entries(buckets)
            .filter(([, c]) => c > 0)
            .sort(([a], [b]) => BUCKET_ORDER.indexOf(a) - BUCKET_ORDER.indexOf(b))
            .map(([group, quantity]) => ({ group, quantity }))
    }, [editReqs])

    const requestBarConfig = {
        quantity: { label: "Requests", color: "var(--color-main-accent)" },
    }

    return (
        <AdminLayout pageName="Dashboard">
            <Block>
                <div className={styles.pageResultsContainer}>
                    <SectionHeader icon={'fluent:calendar-24-filled'} title="Draft Submission Statistics"/>
                    <div className={styles.pageStatisticsGrid}>
                        <PieChartStatistic
                            title={'Submissions Status'}
                            desc={'Status of Draft Submissions sent to admin.'}
                            chartData={submissionPieData}
                            chartConfig={submissionPieConfig}
                            footer={`${statusCounts.pending} pending, ${statusCounts.open + statusCounts.closed} approved.`}
                        />
                        <BarChartStatistic
                            title={'Submissions waiting'}
                            desc={'How long drafts have been waiting in Submission.'}
                            chartData={submissionBarBuckets}
                            chartConfig={submissionBarConfig}
                            footer={`${statusCounts.pending} pending submission${statusCounts.pending !== 1 ? "s" : ""} currently.`}
                        />
                    </div>
                    <SectionHeader icon={'mage:edit-pen-fill'} title="Change Request Statistics"/>
                    <div className={styles.pageStatisticsGrid}>
                        <PieChartStatistic
                            title={'Change Reqs Status'}
                            desc={'Status of Change Requests sent to admin.'}
                            chartData={requestPieData}
                            chartConfig={requestPieConfig}
                            footer={`${requestStatusCounts.pending} pending, ${requestStatusCounts.approved} approved, ${requestStatusCounts.rejected} rejected.`}
                        />
                        <BarChartStatistic
                            title={'Request waiting'}
                            desc={'How long Change Reqs have been waiting in submission.'}
                            chartData={requestBarBuckets}
                            chartConfig={requestBarConfig}
                            footer={`${requestStatusCounts.pending} pending request${requestStatusCounts.pending !== 1 ? "s" : ""} currently.`}
                        />
                    </div>
                </div>
            </Block>
        </AdminLayout>
    );
}

export default AdminDashboard
