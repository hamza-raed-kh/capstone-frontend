import { useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import UserRecord from '../UserRecord/UserRecord'
import styles from './UserList.module.css'

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
            </div>
        </div>
    );
}

export default UserList
