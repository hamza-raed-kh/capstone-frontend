import Icon from '../../Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckboxInput from '../../inputs/CheckboxInput/CheckboxInput';
import NumberInput from '../../inputs/NumberInput/NumberInput';

import styles from './AnswerRules.module.css'
import AnswerRuleLine from '../AnswerRuleLine/AnswerRuleLine';

/**
 * A answerrules component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the answerrules, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the answerrules.
 * @param {'text' | 'num' | 'choice'} props.variant - The question's variant.
 * @returns {JSX.Element} The rendered answerrules element.
 */
const AnswerRules = ({ variant, rules, path=[], actionByPath }) => {
    const [open, setOpen] = useState(true);

    const handleToggleOpen = () => {
        setOpen(!open);         
    }

	const ruleLines = () => {
		switch(variant) {
			case 'text':
                return (
                    <>
                        <AnswerRuleLine
                            rule={rules.word_limit}
                            label={'Word Limit'}
                            path={[...path, 'word_limit']}
                            actionByPath={actionByPath}
                        />
                    </>
                );
				break;
			
			case 'num':
                return (
                    <>
                        <AnswerRuleLine
                            rule={rules.num_min}
                            label={'Min'}
                            path={[...path, 'num_min']}
                            actionByPath={actionByPath}
                        />
                        <AnswerRuleLine
                            rule={rules.num_max}
                            label={'Max'}
                            path={[...path, 'num_max']}
                            actionByPath={actionByPath}
                        />
                        <AnswerRuleLine
                            rule={rules.num_step}
                            label={'Step'}
                            path={[...path, 'num_step']}
                            actionByPath={actionByPath}
                        />
                    </>
                );
				break;
			
			case 'choice':
                return (
                    <>
                        {/* <div className={`${ open && styles.inactive }`}>
                            <CheckboxInput label={'Single Choice?'} value={ true }/>
                        </div> */}
                        <AnswerRuleLine
                            rule={rules.choice_min}
                            label={'Min Choices'}
                            path={[...path, 'choice_min']}
                            actionByPath={actionByPath}
                        />
                        <AnswerRuleLine
                            rule={rules.choice_max}
                            label={'Max Choices'}
                            path={[...path, 'choice_max']}
                            actionByPath={actionByPath}
                        />
                    </>
                );
				break;
			
            default:
                return (<></>);
                break;
		}
	}


	return (
        <div className={styles.answerRules}>
            <div className={styles.answerRulesHeader}>
                <div className={`${styles.answerRulesHeaderIcon} ${ open && styles.opened }`} onClick={handleToggleOpen}>
                    <Icon icon={'iconamoon:arrow-up-2'} size={24}/>
                </div>
                <span className={styles.answerRulesHeaderText} onClick={handleToggleOpen}>
                    Answer Rules:
                </span>
            </div>
            { open &&
                <div className={styles.answerRulesLines}>
                    { ruleLines() }
                </div>
            }
        </div>
	);
}

export default AnswerRules
