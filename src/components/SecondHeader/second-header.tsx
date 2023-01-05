import { ArrowBack } from "@mui/icons-material"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss";

export const SecondHeader: React.FC<{ title:string }> = ({ title }) => {
    const navigate = useNavigate();

    return(
        <Box className={styles.header}>
            <span onClick={() => navigate(-1)}>
                <ArrowBack/>
            </span>
            <h3>{title}</h3>
        </Box>
    )
}