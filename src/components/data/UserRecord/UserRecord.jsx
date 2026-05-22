import { useNavigate } from 'react-router-dom'
import { Button } from '../../inputs/Button/Button'
import styles from './UserRecord.module.css'

/**
 * A userrecord component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the userrecord, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the userrecord.
 * @param {'followed' | 'banned' | 'invited' | 'applicant' | 'participant' | 'disqualified' | 'result'} [props.variant='search'] - The visual variant of the userrecord.
 * @param {string} props.children - The string to be displayed inside the bar's 'placeholder' variant.
 * @param {Function} props.onClick - The function to be called when the userrecord icon is clicked.
 * @returns {JSX.Element} The rendered userrecord element.
 */
const UserRecord = ({ variant = 'invited', avatar, username }) => {
  const navigate = useNavigate();

  const redirectProfile = () => {
    navigate('/profile');
  }

  const handleUnfollow = () => {}
  const handleUnban = () => {}
  const handleUninvite = () => {}
  const handleDisqualify = () => {}
  const handleReturn = () => {}

  const variantButtons = () => {
    switch(variant){
      case 'followed':
        return (
          <>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="red-secondary" onClick={handleUnfollow}>Unfollow</Button>
            </div>
          </>
        );
      
      case 'banned':
        return (
          <>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="secondary" onClick={handleUnban}>Unban</Button>
            </div>
          </>
        );

      case 'invited':
        return (
          <>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="red-secondary" onClick={handleUninvite}>Uninvite</Button>
            </div>
          </>
        );

      case 'applied':
        return (
          <>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="red-secondary" onClick={handleUninvite}>Reject</Button>
            </div>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="green" onClick={handleUninvite}>Approve</Button>
            </div>
          </>
        );

      case 'participant':
        return (
          <>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="red-secondary" onClick={handleDisqualify}>Disqualify</Button>
            </div>
          </>
        );

      case 'disqualified':
        return (
          <>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="green" onClick={handleReturn}>Return</Button>
            </div>
          </>
        );

      case 'result':
        return (
          <>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="red-secondary" onClick={handleUninvite}>Disqualify</Button>
            </div>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="red" onClick={handleUninvite}>Lost</Button>
            </div>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="green" onClick={handleUninvite}>Won</Button>
            </div>
          </>
        );
    }
  }
  
  return (
    <div className={`${styles.userRecordContainer}`}>
      <div className={`${styles.userRecordUser}`} onClick={redirectProfile}>
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
