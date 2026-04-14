import style from './FAQ.module.css'
import Icon from '../Icon/Icon'

/**
 * An FAQ component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the FAQ, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the FAQ.
 * @param {string} props.quesion - The question to be displayed inside the FAQ's header.
 * @param {Function} props.answer - The answer to be desplayed inside the FAQ's body.
 * @returns {JSX.Element} The rendered FAQ element.
 */
function FAQ({question, answer}){
    return <div className={`${style.question}`}>
        <div className={`${style.questionHeader}`}>
            <div className={`${style.questionHeaderIcon}`}>
                <Icon icon={'tdesign:icon-filled'} size={24}/>
            </div>
            <p className={`${style.questionHeaderText}`}>
                {question}
            </p>
        </div>
        <p className={`${style.questionText}`}>
            {answer}
        </p>
    </div>
}

export default FAQ