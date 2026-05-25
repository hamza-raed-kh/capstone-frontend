import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/inputs/Button/Button"
import styles from "./NotFoundPage.module.css"

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Button variant="primary" onClick={() => navigate("/explore")}>Go Home</Button>
    </div>
  )
}

export default NotFoundPage
