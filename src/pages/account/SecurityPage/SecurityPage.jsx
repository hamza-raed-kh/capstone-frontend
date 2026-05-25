import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useChangePasswordMutation, useDeleteMeMutation } from '../../../features/api/authApi'
import { logOut } from '../../../features/user/userThunks'
import { Button } from '../../../components/inputs/Button/Button'
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader'
import TextField from '../../../components/inputs/TextField/TextField'
import Modal from '../../../components/ui/Modal/Modal'
import styles from './SecurityPage.module.css'

const SecurityPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const [deletePassword, setDeletePassword] = useState("")
    const [deleteError, setDeleteError] = useState("")
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const [deleteMe, { isLoading: isDeleting }] = useDeleteMeMutation()

    const handleDiscard = () => {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setError("")
        setSuccess(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            setError("Please fill all fields.")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.")
            return
        }

        try {
            await changePassword({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_new_password: confirmPassword,
            }).unwrap()
            setSuccess(true)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (err) {
            const detail = err?.data?.current_password?.[0]
                || err?.data?.confirm_new_password?.[0]
                || err?.data?.detail
                || "Failed to change password."
            setError(detail)
        }
    }

    const confirmDelete = () => {
        setDeletePassword("")
        setDeleteError("")
        setDeleteModalOpen(true)
    }

    const handleDelete = async () => {
        setDeleteError("")
        if (!deletePassword.trim()) {
            setDeleteError("Please enter your password.")
            return
        }
        try {
            await deleteMe({ password: deletePassword }).unwrap()
            setDeleteModalOpen(false)
            dispatch(logOut())
            navigate('/login', { replace: true })
        } catch (err) {
            const detail = err?.data?.detail || "Failed to delete account."
            setDeleteError(detail)
        }
    }

    return (
        <div className={`${styles.bodyContainer}`}>
            <div className={`${styles.SectionSecurity}`}>
                <SectionHeader icon={'iconamoon:shield-yes-fill'} title={'Security'} />
                <form className={styles.SecurityForm} onSubmit={handleSubmit}>
                    <div className={`${styles.SecurityFields}`}>
                        <TextField label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        <TextField label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <TextField label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>Password changed successfully.</p>}
                    <div className={`${styles.SecurityButtons}`}>
                        <div className={`${styles.SecurityButtonsDiscard}`}>
                            <Button variant={"red-secondary"} type="reset" children={"Discard"} onClick={handleDiscard} />
                        </div>
                        <div className={`${styles.SecurityButtonsSave}`}>
                            <Button variant={"primary"} type="submit" children={isLoading ? "Saving..." : "Save"} />
                        </div>
                    </div>
                </form>
            </div>
            <div className={`${styles.SectionDanger}`}>
                <SectionHeader variant={'red'} icon={'fluent:warning-32-filled'} title={'Danger Zone'} />
                <div className={`${styles.DangerDelete}`}>
                    <div className={`${styles.DangerDeleteButton}`}>
                        <Button variant={"red-secondary"} children={"Delete Account"} onClick={confirmDelete} />
                    </div>
                </div>
            </div>

            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Account">
                <div className={styles.deleteModalBody}>
                    <p className={styles.deleteModalText}>Enter your password to confirm account deletion. This action cannot be undone.</p>
                    <form onSubmit={(e) => { e.preventDefault(); handleDelete() }}>
                        <TextField
                            label="Password"
                            type="password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                        />
                        {deleteError && <p className={styles.error}>{deleteError}</p>}
                        <div className={styles.deleteModalActions}>
                            <Button variant="red-secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                            <Button variant="primary" type="submit" children={isDeleting ? "Deleting..." : "Delete"} />
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default SecurityPage
