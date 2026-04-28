import { Button } from '../inputs/Button/Button'
import styles from './UserRecord.module.css'

/**
 * A userrecord component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the userrecord, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the userrecord.
 * @param {'invited' | 'applicant' | 'participant' | 'disqualified' | 'result' | 'followed' | 'banned'} [props.variant='search'] - The visual variant of the userrecord.
 * @param {string} props.children - The string to be displayed inside the bar's 'placeholder' variant.
 * @param {Function} props.onClick - The function to be called when the userrecord icon is clicked.
 * @returns {JSX.Element} The rendered userrecord element.
 */
const UserRecord = ({ variant = 'invited', avatar, username }) => {
  const handleUninvite = () => {

  }

  const handleUnban = () => {
    
  }

  const variantButtons = () => {
    switch(variant){
      case 'invited':
      return (
        <div className={`${styles.userRecordButton}`}>
          <Button variant="red-secondary" onClick={handleUninvite}>Uninvite</Button>
        </div>
      );
      break;

      case 'banned':
      return (
        <div className={`${styles.userRecordButton}`}>
          <Button variant="secondary" onClick={handleUnban}>Unban</Button>
        </div>
      );
      break;
    }
  }
  
  return (
    <div className={`${styles.userRecordContainer}`}>
      <div className={`${styles.userRecordUser}`}>
        <img className={`${styles.userRecordAvatar}`} src={avatar} alt={'Name'}/>
        <p className={`${styles.userRecordUsername}`}>
          {username}
        </p>
      </div>
      <div className={`${styles.userRecordButtonGroup}`}>
        {variantButtons()}
      </div>
    </div>
  );
}

export default UserRecord
