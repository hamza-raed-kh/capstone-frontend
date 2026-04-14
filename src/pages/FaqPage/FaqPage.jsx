import FAQ from '../../components/FAQ/FAQ';
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import style from './FaqPage.module.css'

function FaqPage({faqs}){

    return (
        <div className={`${style.pageContainer}`}>
            <div className={`${style.pageHeader}`}>
                <SectionHeader icon={'tdesign:icon-filled'} text={'FAQ'} category={'Official'}/>
            </div>
            {Array.from(faqs, (_,i) => <div className={`${style.pageQuestion}`}>
                <FAQ question={_.question} answer={_.answer}/>
            </div>)
            }
        </div>
    );
}

export default FaqPage