import { useState } from 'react';
import Icon from '../../Icon/Icon';
import styles from './ChatInput.module.css';

const ChatInput = () => {
  let [value, setValue] = useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className={styles.inputContainer}>
      <input 
        className={styles.inputText} 
        placeholder={'Send a message...'}
        value={value}
        onChange={handleValueChange}
      />
      <div className={styles.inputIcon}>
        <Icon icon={'streamline:send-email-solid'} color={'white'} size={40} />
      </div>
    </div>
  );
};

export default ChatInput;
