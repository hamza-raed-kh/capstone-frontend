import './Block.css'

function Block(props){
    return <>
        <div className="block">{props.text}</div>
    </>
}

export default Block