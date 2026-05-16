import Icon from '../../Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckboxInput from '../../inputs/CheckboxInput/CheckboxInput';
import Modal from '../../Modal/Modal';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextInput from '../../inputs/TextInput/TextInput';

import styles from './ChoiceOptions.module.css'
import AnswerRuleLine from '../AnswerRuleLine/AnswerRuleLine';
import { Button } from '../../inputs/Button/Button';

/**
 * A choiceoptions component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the choiceoptions, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the choiceoptions.
 * @param {List<string>} props.options - The question choice options.
 * @param {Function} props.deleteByPath - The function to delete a value in the question's choices.
 * @param {Function} props.appendByPath - The function to append a value in the question's choices.
 * @returns {JSX.Element} The rendered choiceoptions element.
 */
const ChoiceOptions = ({ options, path=[], actionByPath }) => {
    const [open, setOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [appendValue, setAppendValue] = useState('');
    
    const handleToggleOpen = (e) => {
        setOpen(!open);
    }
    
    const choiceLines = () => {
        return (<>
            { options.map((_, i) => {
                return (
                    <div className={styles.choiceOption} key={i}>
                        <span className={styles.choiceOptionText}>
                            {_}
                        </span>
                        <div className={styles.choiceOptionClose} onClick={() => actionByPath([...path, i], 'delete')}>
                            <Icon icon={"mdi:close"} size={24}/>
                        </div>
                    </div>
                );
            })}
        </>);
	}


	return (
        <div className={styles.choice}>
            <div className={styles.choiceHeader}>
                <div className={`${styles.choicesHeaderIcon} ${ open && styles.opened }`}>
                    <Icon icon={'iconamoon:arrow-up-2'} size={24} onClick={handleToggleOpen}/>
                </div>
                <span className={styles.choiceHeaderText} onClick={handleToggleOpen}>
                    Choices:
                </span>
            </div>
            { open &&
                <div className={styles.choiceLines}>
                    { choiceLines() }
                    <div className={styles.choiceAdd}>
                        <div className={styles.choiceAddButton}>
                            <Button variant="primary" onClick={() => setModalOpen(true)}>
                                <div className={styles.choiceAddContent}>
                                    <Icon icon={'material-symbols:add'} size={24}/>
                                    Add Choice
                                </div>
                            </Button>
                            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit Your Profile">
                                <form className={styles.choiceModalForm} onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
                                
                                <TextInput 
                                    label="Option: " 
                                    placeholder="Write new option..." 
                                    value={appendValue}
                                    onChange={(e) => setAppendValue(e.target.value)}
                                />

                                <div className={styles.choiceModalButtons}>
                                    <Button
                                        variant={"secondary"}
                                        type={'reset'}
                                        onClick={() => {
                                            setModalOpen(false);
                                            setAppendValue('');
                                        }}
                                    >
                                    Cancel
                                    </Button>
                                    <Button
                                        variant={"primary"}
                                        type={'submit'}
                                        onClick={() => {
                                            setModalOpen(false);
                                            appendValue && actionByPath([...path], 'append', appendValue);
                                            setAppendValue('');
                                        }}
                                    >
                                    Confirm
                                    </Button>
                                </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            }
        </div>
	);
}

export default ChoiceOptions
