import { useState } from 'react'
import { Button } from '../../components/inputs/Button/Button'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import TextField from '../../components/inputs/TextField/TextField'
import SectionedLayout from '../../layouts/SectionedLayout/SectionedLayout'
import SearchBar from '../../components/SearchBar/SearchBar'
import styles from './SecurityPage.module.css'

/**
 * A securitypage component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the securitypage, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the securitypage.
 * @param {Function} props.onDelete - The function to be called when the "Delete Account" string is clicked.
 * @returns {JSX.Element} The rendered securitypage element.
 */
const SecurityPage = ({ onDelete }) => {
    let [password, setPassword] = useState("")
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    let [confirm, setConfirm] = useState("")
    const handleConfirmChange = (event) => {
        setConfirm(event.target.value)
    }

    const handleDiscard = (e) => {
        setPassword("")
        setConfirm("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password.trim() || !confirm.trim()) {
            alert("Please fill all fields!");
        }
        else if (password !== confirm) {
            alert("WARNING: Both passwords don't match!");
        }
        else {
            // TODO: Add Axios request here.
            alert("Input is valid. :)\nRequest to backend to be implemented soon!")
        }
    }

    const handleDelete = (e) => {
        // TODO: Add Axios request here.
        alert("Command to delete account recieved. :)\nDelete confirmation Modal coming soon!")
    }

    return (
        <SectionedLayout preset="account">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">Account Center</SearchBar>
                </div>
                <div className={`${styles.bodyContainer}`}>
                    <div className={`${styles.SectionSecurity}`}>
                        <SectionHeader icon={'tdesign:icon-filled'} text={'Security'} />
                        <form className={styles.SecurityForm} onSubmit={handleSubmit}>
                            <div className={`${styles.SecurityFields}`}>
                                <TextField label="New Password" type="textarea" value={password} handler={handlePasswordChange} />
                                <TextField label="Confirm" type="password" value={confirm} handler={handleConfirmChange} />
                            </div>
                            <div className={`${styles.SecurityButtons}`}>
                                <div className={`${styles.SecurityButtonsDiscard}`}>
                                    <Button variant={"red-secondary"} type="reset" children={"Discard"} onClick={handleDiscard} />
                                </div>
                                <div className={`${styles.SecurityButtonsSave}`}>
                                    <Button variant={"primary"} type="submit" children={"Save"} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={`${styles.SectionDanger}`}>
                        <SectionHeader variant={'red'} icon={'tdesign:icon-filled'} text={'Danger Zone'} />
                        <div className={`${styles.DangerDelete}`}>
                            <div className={`${styles.DangerDeleteButton}`}>
                                <Button variant={"red-secondary"} children={"Delete Account"} onClick={handleDelete} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionedLayout>
    );
}

export default SecurityPage