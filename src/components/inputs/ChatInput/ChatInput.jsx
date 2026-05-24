import { useState } from 'react';
import Icon from '../../ui/Icon/Icon';
import styles from './ChatInput.module.css';

const ChatInput = ({ readOnly = false, onSend, placeholder = "Send a message..." }) => {
  let [value, setValue] = useState('');

  const handleValueChange = (e) => {
    setValue(e.target.value);
  }

  const handleSend = () => {
    if (onSend && value.trim()) {
      onSend(value.trim());
      setValue('');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={`${styles.inputContainer} ${readOnly ? styles.readOnly : ''}`}>
      <input 
        className={styles.inputText} 
        placeholder={placeholder}
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
      />
      {!readOnly && (
      <button className={styles.inputIcon} onClick={handleSend} type="button">
        <Icon icon={'streamline:send-email-solid'} color={'white'} size={40} />
      </button>
      )}
    </div>
  );
};

export default ChatInput;
