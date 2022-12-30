import { Bookmark, Home, Search } from '@mui/icons-material';
import styles from './sidemenu.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const links = [
    {
        title: 'Home',
        icon: <Home/>
    },
    {
        title: 'Search',
        icon: <Search/>
    },
    {
        title: 'Favourites',
        icon: <Bookmark/>
    }
]

export const Sidemenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <section className={styles.sidemenu}>
            <ul>
                {
                    links.map((link) => (
                        <li 
                            onClick={() => navigate(`/${link.title.toLowerCase()}`)} 
                            className={`${styles.listItem} ${location.pathname === "/"+link.title.toLowerCase() ? styles.active : null}`}>
                            {link.icon}
                            <h5>{link.title}</h5>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}