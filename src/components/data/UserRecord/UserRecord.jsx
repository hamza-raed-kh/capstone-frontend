import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../inputs/Button/Button'
import Icon from '../../ui/Icon/Icon'
import styles from './UserRecord.module.css'

const UserRecord = ({ variant = 'invited', avatar, username, userId, onClick, onUnfollow, onUnban, onUninvite, onApprove, onReject, onDisqualify, onReturn }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false)

  const hasAvatar = avatar && !imgError

  const redirectProfile = () => {
    if (onClick) return onClick(userId);
    navigate(userId ? `/profile/${userId}` : '/profile');
  }

  const handleUnfollow = (e) => { e.stopPropagation(); onUnfollow?.(userId) }
  const handleUnban = (e) => { e.stopPropagation(); onUnban?.(userId) }
  const handleUninvite = (e) => { e.stopPropagation(); onUninvite?.(userId) }
  const handleDisqualify = (e) => { e.stopPropagation(); onDisqualify?.(userId) }
  const handleReturn = (e) => { e.stopPropagation(); onReturn?.(userId) }
  const handleApprove = (e) => { e.stopPropagation(); onApprove?.(userId) }
  const handleReject = (e) => { e.stopPropagation(); onReject?.(userId) }

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
              <Button variant="red-secondary" onClick={handleReject}>Reject</Button>
            </div>
            <div className={`${styles.userRecordButton}`}>
              <Button variant="green" onClick={handleApprove}>Approve</Button>
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
