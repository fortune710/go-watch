import { Avatar } from "@mui/material"
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
                    <>
                    <div>
                        <Avatar className={styles.avatar} src={!user?.photoURL ? "" : user.photoURL}/>
                        <h3>{user?.displayName}</h3>
                    </div>
                    
                    </>
                ): <p>You must be signed in to view profile info</p>
            }
            </section>
            <BottomNavbar/>
        </>
    )
}