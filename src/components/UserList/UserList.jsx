import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SectionHeader from '../SectionHeader/SectionHeader'
import UserRecord from '../UserRecord/UserRecord'
import { Button } from '../inputs/Button/Button'
import TextInput from '../inputs/TextInput/TextInput'
import Icon from '../Icon/Icon'
import Modal from '../Modal/Modal'
import { addInvitedUser, removeInvitedUser, selectInvitedUsers } from '../../features/competition/competitionSlice'
import styles from './UserList.module.css'
import inviteStyles from './InviteModal.module.css'

/**
 * A userlist component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the userlist, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the cardgroup.
 * @param {"open" | "closable"?} [props.variant = "closeable"] - The visual variant of the card group.
 * @param {string?} props.icon - The string name of the section's icon (e.g., 'mdi:home').
 * @param {string?} props.title - The string name of section to be displayed inside the header.
 * @param {string?} props.category - The category name to be desplayed after the section header's name.
 * @param {Array<Object>} props.userrecords - The list of card objects that need to be rendered.
 * @returns {JSX.Element} The rendered cardgroup element.
 */
const UserList = ({ variant = "closeable", icon, title, category, userrecords }) => {
    let [open, setOpen] = useState(true)
    let [inviteModalOpen, setInviteModalOpen] = useState(false)
    let [inviteInput, setInviteInput] = useState("")
    const dispatch = useDispatch()
    const invitedUsers = useSelector(selectInvitedUsers)

    const handleRemoveInvited = (username) => {
        dispatch(removeInvitedUser(username))
    }

    const handleAddInvited = () => {
        if (inviteInput.trim() && !invitedUsers.find(u => u.username === inviteInput.trim())) {
            dispatch(addInvitedUser({ username: inviteInput.trim() }))
            setInviteInput("")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddInvited()
        }
    }

    const handleToggleOpen = (e) => {
        setOpen(!open);
    }

    return (
        <div className={`${styles.userList}`}>
            {icon || title || category?
                (<SectionHeader
                    icon={icon}
                    title={title}
                    category={category}
                    opened={variant === 'closeable'? {open, handleToggleOpen} : null}
                />):
                (<></>)
            }
            <div className={`${styles.userrecords}`}>
                {open?
                    userrecords.map((_,i) => 
                        <UserRecord
                            key={i}
                            variant={_.variant}
                            avatar={_.avatar}
                            username={_.username}
                        />
                    ) :
                    (<></>)
                }
                {title === "Invited" && open && (
                    <div className={styles.inviteSection}>
                        <Button variant="primary" onClick={() => setInviteModalOpen(true)}>
                            Invite
                            <Icon icon="mdi:plus" size={20} />
                        </Button>
                    </div>
                )}
            </div>
            <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} title="Invite Participants" hideHeader>
                <div className={inviteStyles.container}>
                    <SectionHeader icon="mdi:information-outline" title="Invite Participant" />
                    <div className={inviteStyles.inputRow}>
                        <TextInput
                            label="Username"
                            inlineLabel
                            value={inviteInput}
                            onChange={e => setInviteInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button variant="primary" className={inviteStyles.inviteBtn} onClick={handleAddInvited}>Invite</Button>
                    </div>
                    <div className={inviteStyles.list}>
                        {invitedUsers.map(u => (
                            <div key={u.username} className={inviteStyles.listItem}>
                                <div className={inviteStyles.userInfo}>
                                    <img className={inviteStyles.avatar} src={`https://i.pravatar.cc/150?u=${u.username}`} alt={u.username} />
                                    <span>{u.username}</span>
                                </div>
                                <Button variant="red-secondary" className={inviteStyles.removeBtn} onClick={() => handleRemoveInvited(u.username)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className={inviteStyles.footer}>
                        <Button variant="red-secondary" onClick={() => setInviteModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={() => setInviteModalOpen(false)}>Invite</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UserList
