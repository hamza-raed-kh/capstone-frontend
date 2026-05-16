import { Button } from '../../inputs/Button/Button'
import Icon from '../../ui/Icon/Icon';
import { useState } from 'react';
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
 * @param {number} props.order - The order of this question in the form.
 * @param {number} props.form_length - The number of questions in the form.
 * @param {boolean} props.required - The flag indicating whether the question is required.
 * @param {'type' | 'num' | 'choice'} props.type - The question's type.
 * @param {string} props.question - The text of this question.
 * @param {{rule_name: {active: boolean, num: number}}} props.rules - The object of rules for question's answers.
 * @param {List<string>} props.options - The list of options for choice options.
 * @param {Function} props.actionByPath - The function to perform an action on the from stat
 * @param {Function} props.moveQuestion - Direct function to reorder questions.
 * @returns {JSX.Element} The rendered formquestion element.
 */
const FormQuestion = ({ order, form_length, required, type, question, options, rules, path=[], actionByPath, moveQuestion }) => {
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
								value={order+1}
                                readOnly
							/>
						</div>
						<span>:</span>
					</div>
					{/* <div className={styles.questionHeaderSide}>
						<label htmlFor={'Page'}>Page</label>
						<div className={styles.questionHeaderSideField}>
							<NumberInput
								label={'Page'}
								inlineLabel
								value={page}
								onChange={(e) => actionByPath([...path, 'page'], 'update', e.target.value)}
							/>
						</div>
						<span>:</span>
					</div> */}
				</div>
				<div className={styles.questionHeaderSecond}>
					<div className={styles.questionHeaderSecondField}>
						<label className={styles.rowLabel} htmlFor={'Question'}>Question:</label>
						<TextInput
							label={'Question'}
							inlineLabel
							value={question}
							onChange={(e) => actionByPath([...path, 'question'], 'update', e.target.value)}
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
									onChange={(newValue) => actionByPath([...path, 'type'], 'update', newValue)}
								/>
							</div>
							<div className={styles.questionDetailsSecond}>
								<CheckboxInput
									label={'Required?'}
									value={ required }
									onChange={() => actionByPath([...path, 'required'], 'toggle')}
								/>
							</div>
						</div>
						<AnswerRules
							variant={type}
							rules={rules}
							path={[...path, 'rules']}
							actionByPath={actionByPath}
						/>
						{ type === 'choice' &&
							<ChoiceOptions
								options={options}
								path={[...path, 'options']}
								actionByPath={actionByPath}
							/>
						}
					</div>
					<div className={styles.questionFooter}>
						<div className={styles.questionFooterStart}>
							<button
								type="button"
								className={styles.moveButton}
								disabled={order === 0}
								onClick={() => moveQuestion(order, order - 1)}
							>
								<Icon icon="mdi:chevron-up" size={20} />
							</button>
							<button
								type="button"
								className={styles.moveButton}
								disabled={order === form_length - 1}
								onClick={() => moveQuestion(order, order + 1)}
							>
								<Icon icon="mdi:chevron-down" size={20} />
							</button>
						</div>
						<div className={styles.questionFooterButton}>
							<Button variant={'secondary'} children={'Delete'} onClick={() => actionByPath([...path], 'delete')}/>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

export default FormQuestion
