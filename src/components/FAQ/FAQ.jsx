import style from './FAQ.module.css'
import Icon from '../Icon/Icon'

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