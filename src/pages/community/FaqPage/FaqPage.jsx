import FAQ from '../../../components/data/FAQ/FAQ';
import SearchBar from '../../../components/ui/SearchBar/SearchBar';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader'
import SectionedLayout from '../../../layouts/SectionedLayout/SectionedLayout'
import styles from './FaqPage.module.css'

/**
 * An FaqPage component with a single visual style.
 *
 * @param {object} props - The properties for the FaqPage.
 * @param {string} props.comp_name - The of the competition that the FAQ questions are about.
 * @param {Array<{question: string, answer: string}>} props.faqs - The list of question & answer dictionaries to be used in the page's FAQ questions.
 * @returns {JSX.Element} The rendered FaqPage element.
 */
const FaqPage = ({ comp_name, faqs}) => {
    faqs = faqs || [
        {
            question: "Is this Question 1?",
            answer: "Yes, this is question 1.",
        },
        {
            question: "Is this Question 2?",
            answer: "Yes, this is question 2.",
        },
        {
            question: "Is this Question 3?",
            answer: "Yes, this is question 3.",
        },
        {
            question: "Is this Question 1?",
            answer: "Yes, this is question 1.",
        },
        {
            question: "Is this Question 2?",
            answer: "Yes, this is question 2.",
        },
        {
            question: "Is this Question 3?",
            answer: "Yes, this is question 3.",
        },
        {
            question: "Is this Question 1?",
            answer: "Yes, this is question 1.",
        },
        {
            question: "Is this Question 2?",
            answer: "Yes, this is question 2.",
        },
        {
            question: "Is this Question 3?",
            answer: "Yes, this is question 3.",
        },
    ]

    return (
        <SectionedLayout preset="community">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{comp_name || "dsd\nd\newdsdjdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"}</SearchBar>
                </div>
                <div className={`${styles.bodyContainer}`}>
                    <div className={`${styles.bodyHeader}`}>
                        <SectionHeader icon={'material-symbols:question-mark-rounded'} title={'FAQ'} category={'Official'}/>
                    </div>
                    <div className={styles.bodyQuestionList}>
                        {faqs.map((_,i) =>
                            <div className={`${styles.bodyQuestion}`}>
                                <FAQ key={i} question={_.question} answer={_.answer}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SectionedLayout>
    );
}

export default FaqPage