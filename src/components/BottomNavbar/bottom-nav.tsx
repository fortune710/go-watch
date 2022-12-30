import { Home, Search, Bookmark, Person } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Container, SxProps } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './bottom-nav.module.scss';

export const BottomNavbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const value = location.pathname.replace("/", "");

    const Styles: SxProps = {
        borderRadius: "10px",
        margin: "0 auto",
        backgroundColor: "var(--background-tint)",
        color: "white",
        zIndex: 100
    }

    const container: SxProps = {
        width: "100%",
        position: "fixed",
        bottom: "10px",
    }

    const tab: SxProps = {
        color: "white",
        fontSize: "12px"
    }

    return(
        <Container sx={container} className={styles.navbar}>
            <BottomNavigation sx={Styles} className={styles.navbar} value={value} onChange={(e, val) => navigate(`/${val}`)}>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    sx={tab}
                    icon={<Home />}
                />

                <BottomNavigationAction
                    label="Search"
                    value="search"
                    sx={{color: "white"}}
                    icon={<Search />}
                />

                <BottomNavigationAction
                    label="Favorites"
                    value="favourites"
                    sx={{color: "white"}}
                    icon={<Bookmark />}
                />

                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    sx={{color: "white"}}
                    icon={<Person />}
                />
            </BottomNavigation>
        </Container>
    )
}