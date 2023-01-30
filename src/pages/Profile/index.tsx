import { Avatar, Button } from "@mui/material"
import { BottomNavbar, Sidemenu } from "../../components"
import { useAuth } from "../../hooks/useAuth";
import styles from "./index.module.scss";

export const ProfilePage: React.FC = () => {
    const { user, updateProfilePicture, updateUsername } = useAuth();
    return(
        <>
            <Sidemenu/>
            <section className="sidemenu-page">
            {
                user ? (
                    <div className={styles.profileContainer}>
                        <Avatar 
                            sx={{ width: 100, height: 100 }}
                            src={!user?.photoURL ? "" : user.photoURL}
                        />
                        <h3>{user?.displayName}</h3>
                        <Button 
                            variant="contained"
                            sx={{ textTransform: "capitalize"}}
                            color="error"
                        >
                            Sign Out
                        </Button>
                    </div>
                ): <p>You must be signed in to view profile info</p>
            }
            </section>
            <BottomNavbar/>
        </>
    )
}