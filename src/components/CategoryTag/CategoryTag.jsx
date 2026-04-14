import style from './CategoryTag.module.css'

/**
 * A categorytag component with a single visual style.
 *
 * @param {object} props - The properties for the categorytag.
 * @param {string} props.text - The category name to be displayed inside the tag.
 * @returns {JSX.Element} The rendered categorytag element.
 */
const CategoryTag = ({text}) => {
    return(
        <div className={`${style.category}`}>
            <span className={`${style.categoryText}`}>
                {text}
            </span>
        </div>
    );
}

export default CategoryTag