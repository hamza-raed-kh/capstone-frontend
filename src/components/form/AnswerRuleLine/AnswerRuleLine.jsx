import Icon from '../../Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckboxInput from '../../inputs/CheckboxInput/CheckboxInput';
import NumberInput from '../../inputs/NumberInput/NumberInput';

import styles from './AnswerRuleLine.module.css'

/**
 * A answerruleline component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the answerruleline, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the answerruleline.
 * @param {boolean} props.active - The value determining if this rule is applied.
 * @param {boolean} props.onChangeActive - The function to be called when 'active' is changed.
 * @param {boolean} props.label - The rule's label.
 * @param {boolean} props.num - The numerical value associated with the rule.
 * @param {boolean} props.onChangeNum - The function to be called when 'num' is changed.
 * @returns {JSX.Element} The rendered answerruleline element.
 */
const AnswerRuleLine = ({ rule, label, path=[], actionByPath }) => {

	return (
        <div className={`${styles.answerRuleLine} ${ !rule.active && styles.inactive }`}>
            <div className={`${styles.answerRuleLineLeft}`}>
                <CheckboxInput
                    label={`${label}:`}
                    checked={rule.active}
                    onChange={() => actionByPath([...path, 'active'], 'toggle')}
                />
            </div>
            <div className={styles.answerRuleLineRight}>
                <NumberInput
                    value={rule.num}
                    onChange={(e) => actionByPath([...path, 'num'], 'update', e.target.value)}
                />
            </div>
        </div>
	);
}

export default AnswerRuleLine
