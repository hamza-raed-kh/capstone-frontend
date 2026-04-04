import Icon from '../Icon/Icon';
import './SectionHeader.css'

function SectionHeader({icon, text, category}){
    return (
        <div className="section-header">
            {icon? <div className="section-header-icon">
                <Icon/>
            </div>: <></>}
            <span className="section-header-name">
                {text}
            </span>
            {category? <><span className="section-header-category">&gt;</span><span className="section-header-category">{category}</span></> : <></>}
        </div>
    );
}

export default SectionHeader