import { useCallback, useMemo } from "react"
import Results from "../../../components/data/Results/Results"
import { useGetMeQuery } from "../../../features/api/authApi"
import {
    useGetMyFollowingQuery,
    useGetBlockedUsersQuery,
    useUnfollowUserMutation,
    useUnbanUserMutation,
} from "../../../features/api/followApi"
import styles from './FollowingPage.module.css'

function getDisplayName(user) {
    if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`
    if (user.first_name) return user.first_name
    return user.email
}

function FollowingPage() {
    const { data: me } = useGetMeQuery()
    const { data: followingData } = useGetMyFollowingQuery(me?.id, { skip: !me?.id })
    const { data: blockedData } = useGetBlockedUsersQuery()
    const [unfollowUser] = useUnfollowUserMutation()
    const [unbanUser] = useUnbanUserMutation()

    const handleUnfollow = useCallback((userId) => {
        if (userId) unfollowUser(userId)
    }, [unfollowUser])

    const handleUnban = useCallback((userId) => {
        if (userId) unbanUser(userId)
    }, [unbanUser])

    const userlists = useMemo(() => {
        const sections = []

        const followed = (followingData || []).map((item) => {
            const u = item.followed_detail
            return {
                variant: "followed",
                avatar: u?.profile_picture,
                username: getDisplayName(u || {}),
                userId: u?.id,
                onUnfollow: handleUnfollow,
            }
        })

        if (followed.length) {
            sections.push({ icon: "ic:round-people", title: "Followed", userrecords: followed })
        }

        const banned = (blockedData || []).map((item) => {
            const u = item.blocked_detail
            return {
                variant: "banned",
                avatar: u?.profile_picture,
                username: getDisplayName(u || {}),
                userId: u?.id,
                onUnban: handleUnban,
            }
        })

        if (banned.length) {
            sections.push({ icon: "ic:round-block", title: "Banned", userrecords: banned })
        }

        return sections
    }, [followingData, blockedData, handleUnfollow, handleUnban])

    return (
        <>
            {userlists.length > 0 && (
                <div className={styles.pageResultsSection}>
                    <Results variant={'userlists'} sections={userlists} />
                </div>
            )}
            {!userlists.length && (
                <div className={styles.pageResultsSection}>
                    <p className={styles.emptyText}>No followed or banned users yet.</p>
                </div>
            )}
        </>
    )
}

export default FollowingPage
