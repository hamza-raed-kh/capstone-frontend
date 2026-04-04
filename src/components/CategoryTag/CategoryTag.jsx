import './CategoryTag.css'

function CategoryTag({text}){
    return <>
        <div className="category">
            <span className="category-text">
                {text}
            </span>
        </div>
    </>
}

export default CategoryTag