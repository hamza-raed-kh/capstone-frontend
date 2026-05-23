import FAQ from '../../../components/data/FAQ/FAQ';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader'
import styles from './FaqPage.module.css'

const FaqPage = () => {
    const faqs = [
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
        <div className={styles.pageContainer}>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyHeader}>
                    <SectionHeader icon={'material-symbols:question-mark-rounded'} title={'FAQ'} category={'Official'}/>
                </div>
                <div className={styles.bodyQuestionList}>
                    {faqs.map((faq, i) =>
                        <div className={styles.bodyQuestion} key={i}>
                            <FAQ question={faq.question} answer={faq.answer}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FaqPage