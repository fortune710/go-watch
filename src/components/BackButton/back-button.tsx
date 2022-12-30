import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import styles from './back-button.module.scss';

export const BackButton: React.FC = () => {
    const navigate = useNavigate()

    return(
        <span className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowBack sx={{ color: 'white'}}/>
        </span>
    )
}