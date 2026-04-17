import FAQ from '../../components/FAQ/FAQ';
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './FaqPage.module.css'

/**
 * An FaqPage component with a single visual style.
 *
 * @param {object} props - The properties for the FaqPage.
 * @param {Array<object>} props.faqs - The list of question & answer dictionaries to be used in the page's FAQ questions.
 * @returns {JSX.Element} The rendered FaqPage element.
 */
const FaqPage = ({faqs}) => {
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`${styles.pageHeader}`}>
                <SectionHeader icon={'tdesign:icon-filled'} text={'FAQ'} category={'Official'}/>
            </div>
            {Array.from(faqs, (_,i) =>
                <div className={`${styles.pageQuestion}`}>
                    <FAQ key={i} question={_.question} answer={_.answer}/>
                </div>
            )}
        </div>
    );
}

export default FaqPage