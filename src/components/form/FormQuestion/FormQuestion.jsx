import { Button } from '../../inputs/Button/Button'
import Icon from '../../Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckboxInput from '../../inputs/CheckboxInput/CheckboxInput';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import TextInput from '../../inputs/TextInput/TextInput';

import styles from './FormQuestion.module.css'
import SelectInput from '../../inputs/SelectInput/SelectInput';
import AnswerRules from '../AnswerRules/AnswerRules';
import ChoiceOptions from '../ChoiceOptions/ChoiceOptions';

/**
 * A formquestion component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the formquestion, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the formquestion.
 * @param {number} props.order - The order of this question in the page.
 * @param {boolean} props.required - The flag indicating whether the question is required.
 * @param {'type' | 'num' | 'choice'} props.type - The question's type.
 * @param {number} props.page - The number of question's page in the form.
 * @param {string} props.question - The text of this question.
 * @param {{rule_name: {active: boolean, num: number}}} props.rules - The object of rules for question's answers.
 * @param {List<string>} props.options - The list of options for choice options.
 * @param {number} props.max_pages - The number of pages in the form.
 * @param {Function} props.updateByPath - The function to update a value in this question.
 * @param {Function} props.toggleByPath - The function to toggle a boolean value in this question.
 * @param {Function} props.deleteByPath - The function to delete a value in this question.
 * @param {Function} props.appendByPath - The function to append a value in this question.
 * @param {Function} props.onDelete - The function to be called when question is deleted.
 * @returns {JSX.Element} The rendered formquestion element.
 */
const FormQuestion = ({ order, required, type, page, question, options, rules, max_pages, updateByPath, toggleByPath, deleteByPath, appendByPath, onDelete }) => {
	const [open, setOpen] = useState(true);

    const handleToggleOpen = () => {
        setOpen(!open);
    }

	return (
		<div className={styles.questionContainer}>
			<div className={`${styles.questionHeader} ${open && styles.headerOpened}`}>
				<div className={styles.questionHeaderFirst}>
					<div className={styles.questionHeaderSide}>
						<label htmlFor={'Order'}>Q.</label>
						<div className={styles.questionHeaderSideField}>
							<NumberInput
								label={'Order'}
								inlineLabel
								value={order}
								onChange={(e) => updateByPath(['order'], e.target.value)}
							/>
						</div>
						<span>:</span>
					</div>
					<div className={styles.questionHeaderSide}>
						<label htmlFor={'Page'}>Page</label>
						<div className={styles.questionHeaderSideField}>
							<NumberInput
								label={'Page'}
								inlineLabel
								value={page}
								onChange={(e) => updateByPath(['page'], e.target.value)}
								max={max_pages}
							/>
						</div>
						<span>:</span>
					</div>
				</div>
				<div className={styles.questionHeaderSecond}>
					<div className={styles.questionHeaderSecondField}>
						<label className={styles.rowLabel} htmlFor={'Question'}>Question:</label>
						<TextInput
							label={'Question'}
							inlineLabel
							value={question}
							onChange={(e) => updateByPath(['question'], e.target.value)}
						/>
					</div>
					<div className={`${styles.questionHeaderSecondIcon} ${open && styles.opened}`}  onClick={handleToggleOpen}>
						<Icon icon={'iconamoon:arrow-up-2'} size={30}/>
					</div>
				</div>
			</div>
			{open &&
				<div className={styles.questionContent}>
					<div className={styles.questionBody}>
						<div className={styles.questionDetails}>
							<div className={styles.questionDetailsFirst}>
								<span>Type: </span>
								<SelectInput
									placeholder={ 'Select type' }
									options={[
										{ label: 'Text', value: 'text' },
										{ label: 'Numeric', value: 'num' },
										{ label: 'Multiple Choice', value: 'choice' }
									]}
									value={ type }
									onChange={(newValue) => updateByPath(['type'], newValue)}
								/>
							</div>
							<div className={styles.questionDetailsSecond}>
								<CheckboxInput
									label={'Required?'}
									value={ required }
									onChange={() => toggleByPath(['required'])}
								/>
							</div>
						</div>
						<AnswerRules
							variant={type}
							rules={rules}
							updateByPath={(path, value) => updateByPath(['rules', ...path], value)}
							toggleByPath={(path) => toggleByPath(['rules', ...path])}
						/>
						{ type === 'choice' &&
							<ChoiceOptions
								options={options}
								deleteByPath={(path) => deleteByPath(['options', ...path])}
								appendByPath={(path, value) => appendByPath(['options', ...path], value)}
							/>
						}
					</div>
					<div className={styles.questionFooter}>
						<div className={styles.questionFooterButton}>
							<Button variant={'secondary'} children={'Delete'} onClick={onDelete}/>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

export default FormQuestion
