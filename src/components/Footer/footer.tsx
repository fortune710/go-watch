import styles from "./footer.module.scss";
import Logo from "../../assets/logo.png";

export const Footer = () => (
    <footer className={styles.footer}>
        <img src={Logo} alt="Logo"/>

        <p>©️ 2022 Made with 💖 by Fortune Alebiosu</p>
    </footer>
)