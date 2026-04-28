import UserList from "../UserList/UserList"
import styles from './UserResults.module.css'



const Results = ({ userlists }) => {return (
        <div className={`${styles.results}`}>
            {userlists.map((_, index) => (
                <UserList
                    key={index}
                    icon={_.icon}
                    title={_.title}
                    category={_.category}
                    userrecords={_.userrecords}
                />
            ))}
        </div>
    );
}

export default Results