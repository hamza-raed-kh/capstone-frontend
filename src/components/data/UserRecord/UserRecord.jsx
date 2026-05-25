import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../inputs/Button/Button'
import Icon from '../../ui/Icon/Icon'
import styles from './UserRecord.module.css'

const UserRecord = ({ variant = 'invited', avatar, username, userId, onUnfollow, onUnban }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false)

  const hasAvatar = avatar && !imgError

  const redirectProfile = () => {
    navigate(userId ? `/profile/${userId}` : '/profile');
  }

  const handleUnfollow = () => { onUnfollow?.(userId) }
  const handleUnban = () => { onUnban?.(userId) }
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
        {hasAvatar ? (
          <img className={`${styles.userRecordAvatar}`} src={avatar} alt={username} onError={() => setImgError(true)}/>
        ) : (
          <div className={`${styles.userRecordAvatar} ${styles.avatarPlaceholder}`}>
            <Icon icon="mdi:account-circle" size={33} />
          </div>
        )}
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
